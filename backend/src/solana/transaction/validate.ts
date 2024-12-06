import { 
  type Address,
  getBase64Encoder,
  getTransactionDecoder,
  getCompiledTransactionMessageDecoder,
  decompileTransactionMessageFetchingLookupTables,
  assertIsInstructionWithData,
  assertIsInstructionWithAccounts,
  type Signature
} from '@solana/web3.js';
import { 
  identifyTokenInstruction, 
  TokenInstruction,
  parseTransferCheckedInstruction 
} from '@solana-program/token';
import { createPaymentRecord, getPaymentBySignature } from '../../db/payment';
import { ValidatedPayment } from '../../types/payment';
import { 
  deriveAppPda, 
  deriveCoursePda,
  USDC_MINT
} from '../../lib/constants';
import { rpc } from '../rpc';
import { getUserById } from '../../db/auth';
import { getCourseWithModules } from '../../db/course';

interface TransactionSigner {
  address: Address;
  signature: string | null;
}

export async function validateTransaction(
  signature: string,
  userId: string,
  courseId: string
): Promise<ValidatedPayment> {  
  // Check if payment already exists
  const existingPayment = await getPaymentBySignature(signature);
  if (existingPayment) {
    throw new Error('Payment already processed');
  }

  // Get course to find instructor
  const course = await getCourseWithModules(courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  // Get instructor's PDA address
  const instructor = await getUserById(course.instructor_id);
  if (!instructor || !instructor.pda_address) {
    throw new Error('Instructor PDA address not found');
  }

  const response = await rpc.getTransaction(signature as Signature, {
    maxSupportedTransactionVersion: 0,
    encoding: 'base64'
  }).send();

  if (!response) {
    throw new Error('Failed to fetch transaction');
  }

  // Decode transaction
  const base64Encoder = getBase64Encoder();
  const transactionBytes = base64Encoder.encode(response.transaction[1]);
  const transactionDecoder = getTransactionDecoder();
  const decodedTransaction = transactionDecoder.decode(transactionBytes);

  // Get transaction signers
  const signers: TransactionSigner[] = Object.entries(decodedTransaction.signatures)
    .map(([address, signature]) => ({
      address: address as Address,
      signature: signature?.toString() || null
    }));

  // Verify we have at least one signer
  if (signers.length === 0) {
    throw new Error('No signers found in transaction');
  }

  // Get the primary signer (first one)
  const primarySigner = signers[0];
  if (!primarySigner.signature) {
    throw new Error('Primary signer has not signed the transaction');
  }

  // Decode and decompile message
  const messageDecoder = getCompiledTransactionMessageDecoder();
  const compiledMessage = messageDecoder.decode(decodedTransaction.messageBytes);
  const message = await decompileTransactionMessageFetchingLookupTables(
    compiledMessage,
    rpc
  );

  // Get the payment instruction (usually the last one)
  const payInstruction = message.instructions[message.instructions.length - 1];
  if (!payInstruction) {
    throw new Error('Missing transfer instruction');
  }

  // Verify instruction type and parse
  assertIsInstructionWithData(payInstruction);
  assertIsInstructionWithAccounts(payInstruction);
  
  const instructionType = identifyTokenInstruction(payInstruction);
  if (instructionType !== TokenInstruction.TransferChecked) {
    throw new Error('Not a transfer checked instruction');
  }

  // Parse instruction data
  const parsedInstruction = parseTransferCheckedInstruction(payInstruction);
  const { accounts, data } = parsedInstruction;

  // Derive expected PDAs
  const [appPda, coursePda] = await Promise.all([
    deriveAppPda('mentora'),
    deriveCoursePda(courseId)
  ]);

  // Validate payment details
  const validations = [
    {
      condition: accounts.mint.address === USDC_MINT,
      error: 'Invalid currency'
    },
    {
      condition: accounts.destination.address === instructor.pda_address,
      error: 'Invalid recipient'
    },
    {
      condition: data.amount > 0n,
      error: 'Invalid amount'
    },
    {
      condition: accounts.authority.address === appPda,
      error: 'Invalid app reference'
    },
    {
      condition: accounts.source.address === coursePda,
      error: 'Invalid course reference'
    }
  ];

  for (const { condition, error } of validations) {
    if (!condition) {
      throw new Error(error);
    }
  }

  // Calculate hours from payment amount
  const hoursBooked = Number(data.amount) / 1_000_000; // Convert from USDC (6 decimals)

  // Create payment record with user and course info
  await createPaymentRecord({
    signature,
    signer: primarySigner.address,
    recipient: accounts.destination.address,
    amount: data.amount,
    currency: accounts.mint.address,
    status: 'confirmed',
    timestamp: new Date(),
    user_id: userId,
    course_id: courseId
  });

  return {
    signature,
    signer: primarySigner.address.toString(),
    recipient: accounts.destination.address.toString(),
    amount: data.amount.toString(),
    currency: accounts.mint.address.toString(),
    hoursBooked
  };
}