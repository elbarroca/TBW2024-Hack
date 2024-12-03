export async function validateTransaction(signature: string) {
  /*// Fetch and decode transaction
  const response = await fetchTransaction(signature);
  const message = TransactionMessage.decode(response.transaction.message);
  
  // Get the last instruction (payment instruction)
  const instructions = message.compiledInstructions;
  const payInstruction = instructions[instructions.length - 1];
  
  if (!payInstruction) {
    throw new Error("Missing transfer instruction");
  }

  // Decode transfer instruction data
  const decodedInstruction = TokenTransferInstruction.decode(payInstruction.data);
  if (!decodedInstruction.isTransferChecked()) {
    throw new Error("Not a transfer checked instruction");
  }

  // Get account addresses from instruction
  const accountIndexes = payInstruction.accountKeyIndexes;
  const [sourceIndex, mintIndex, destinationIndex, ownerIndex, referenceIndex] = accountIndexes;
  const accounts = message.getAccountKeys();

  const source = accounts.get(sourceIndex);
  const mint = accounts.get(mintIndex);
  const destination = accounts.get(destinationIndex);
  const owner = accounts.get(ownerIndex);
  const paymentReference = accounts.get(referenceIndex);

  if (!source || !mint || !destination || !owner || !paymentReference) {
    throw new Error("Missing required accounts");
  }

  // Fetch and decode destination token account
  const sellerATA = await getAccountInfo(
    destination,
    { commitment: 'confirmed' }
  );

  if (!sellerATA?.data) {
    throw new Error("Error fetching ATA info");
  }

  const decodedSellerATA = SolanaToken.decodeAccount(sellerATA.data);
  
  // Calculate and validate payment amount
  const hourPrice = new BigNumber(HOUR_PRICE);
  const price = hourPrice
    .times(new BigNumber(10).pow(DECIMALS.USDC))
    .integerValue(BigNumber.ROUND_FLOOR);

  const rawAmount = decodedInstruction.getAmount();
  const quotient = new BigNumber(rawAmount.toString()).dividedBy(price);

  // Validation checks
  if (!quotient.isInteger()) {
    throw new Error("Invalid payment amount");
  }

  const validations = [
    {
      condition: PAYMENT_REFERENCE.toString() === paymentReference.toString(),
      error: "Wrong app reference"
    },
    {
      condition: decodedSellerATA.owner.toString() === RIKI_PUBKEY.toString(),
      error: "Wrong seller"
    },
    {
      condition: decodedSellerATA.mint.toString() === USDC_MINT,
      error: "Wrong currency"
    }
  ];

  for (const { condition, error } of validations) {
    if (!condition) {
      throw new Error(error);
    }
  }

  // Return validated payment info
  return {
    signer: owner.toString(),
    seller: decodedSellerATA.owner.toString(),
    currency: decodedSellerATA.mint.toString(),
    amount: rawAmount.toString(),
    hoursBooked: quotient.toNumber()
  };*/
}