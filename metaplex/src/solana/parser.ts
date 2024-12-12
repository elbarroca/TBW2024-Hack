import { MessageCompiledInstruction, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { getMangoClient, getMangoGroup, initializeMangoClient } from '../mango';
import { DepositEvent, LiquidationEvent, MangoEvent, PerpCancelAllOrdersEvent, PerpCancelOrderEvent, PerpFillEvent, PerpForceClosePositionEvent, PerpPlaceOrderEvent, PerpSettleFeesEvent, PerpSettlePnlEvent, SwapEvent, TradeEvent, WithdrawEvent } from '../types';
import { BorshInstructionCoder } from "@coral-xyz/anchor";
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';

let coder: BorshInstructionCoder | null = null;

export async function initializeParser() {
    await initializeMangoClient();
    const mangoClient = getMangoClient();
    coder = new BorshInstructionCoder(mangoClient.program.idl);
}

export function parseTransaction(transaction: VersionedTransaction, signature: string, blockTime: number | null | undefined): MangoEvent[] {
    if (!coder) {
        throw new Error('Parser not initialized. Call initializeParser() first.');
    }

    const instructions = transaction.message.compiledInstructions;
    const signers = transaction.message.staticAccountKeys
        .filter((_, index) => transaction.message.isAccountSigner(index))
        .map((pubkey) => pubkey.toBase58());

    const events: MangoEvent[] = [];

    for (let i = 2; i < instructions.length; i++) {
        const ix = instructions[i];

        try {
            const base58Data = bs58.encode(ix.data);
            const decodedIx = coder.decode(base58Data, "base58");
            if (!decodedIx) continue;

            let event: MangoEvent | null = null;

            switch (decodedIx.name) {
                case 'tokenDeposit':
                    event = handleDeposit(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'tokenWithdraw':
                    event = handleWithdraw(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;

                case 'perpPlaceOrder':
                case 'perpPlaceOrderV2':
                    event = handlePerpPlaceOrder(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'perpSettlePnl':
                    event = handlePerpSettlePnl(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'perpSettleFees':
                    event = handlePerpSettleFees(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'perpForceClosePosition':
                    event = handlePerpForceClosePosition(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;

                case 'perpPlaceOrderV2':
                    event = handlePerpPlaceOrder(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'perpCancelOrder':
                    event = handlePerpCancelOrder(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'perpCancelAllOrders':
                    event = handlePerpCancelAllOrders(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                case 'perpFill':
                    event = handlePerpFill(decodedIx, ix, signature, blockTime, signers, transaction.message.staticAccountKeys);
                    break;
                default:
                    console.log(decodedIx.name);
            }

            if (event) {
                events.push(event);
            }
        } catch (error) {
            console.error(`Error parsing instruction: ${error}`);
            // Optionally, you could add a special "error" event to the events array here
        }
    }

    return events;
}

function handleDeposit(
    decodedIx: any,
    ix: MessageCompiledInstruction,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): DepositEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, owner, bank, vault, oracle, tokenAccount, tokenAuthority] = accounts;
    const { amount } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();

    return {
        signature,
        eventType: 'tokenDeposit',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        amount: amount.toString(),
        token: 'USDC',
        owner: owner.toBase58(),
        bank: bank.toBase58(),
        vault: vault.toBase58(),
        tokenAccount: tokenAccount.toBase58(),
    };
}

function handleWithdraw(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): WithdrawEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, owner, bank, vault, oracle, tokenAccount] = accounts;
    const { amount } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();

    return {
        signature,
        eventType: 'tokenWithdraw',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        amount: amount.toString(),
        token: 'USDC',
        owner: owner.toBase58(),
        bank: bank.toBase58(),
        vault: vault.toBase58(),
        tokenAccount: tokenAccount.toBase58(),
    };
}

function handlePerpPlaceOrder(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpPlaceOrderEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, owner, perpMarket] = accounts;
    const { side, price, quantity, maxBaseQuantity, maxQuoteQuantity, clientOrderId, orderType, reduceOnly, expiryTimestamp, limit } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpPlaceOrder',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        side: side === 0 ? 'buy' : 'sell',
        price: price.toString(),
        quantity: quantity.toString(),
        clientOrderId: clientOrderId.toString(),
        orderType,
        reduceOnly,
        token,
        owner: owner.toBase58(),
        maxBaseQuantity: maxBaseQuantity.toString(),
        maxQuoteQuantity: maxQuoteQuantity.toString(),
        expiryTimestamp: expiryTimestamp.toString(),
        limit: limit.toString(),
    };
}

function handlePerpSettlePnl(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpSettlePnlEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, perpMarket, accountA, accountB, oracle] = accounts;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpSettlePnl',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        token,
        accountA: accountA.toBase58(),
        accountB: accountB.toBase58(),
    };
}

function handlePerpSettleFees(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpSettleFeesEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, perpMarket, feeAccount] = accounts;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpSettleFees',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        token,
        feeAccount: feeAccount.toBase58(),
    };
}

function handlePerpForceClosePosition(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpForceClosePositionEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, perpMarket, oracle, liqor, liqorOwner] = accounts;
    const { baseTransfer } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpForceClosePosition',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        token,
        liqor: liqor.toBase58(),
        liqorOwner: liqorOwner.toBase58(),
        baseTransfer: baseTransfer.toString(),
    };
}

function handlePerpCancelOrder(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpCancelOrderEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, owner, perpMarket] = accounts;
    const { orderId, clientOrderId } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpCancelOrder',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        orderId: orderId.toString(),
        clientOrderId: clientOrderId.toString(),
        token,
        owner: owner.toBase58(),
    };
}

function handlePerpCancelAllOrders(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpCancelAllOrdersEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, owner, perpMarket] = accounts;
    const { limit } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpCancelAllOrders',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        limit: limit.toString(),
        token,
        owner: owner.toBase58(),
    };
}

function handlePerpFill(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): PerpFillEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    const [group, mangoAccount, perpMarket, maker, taker] = accounts;
    const { makerOrderId, takerOrderId, makerFee, takerFee, price, quantity } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpFill',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        maker: maker.toBase58(),
        taker: taker.toBase58(),
        makerOrderId: makerOrderId.toString(),
        takerOrderId: takerOrderId.toString(),
        makerFee: makerFee.toString(),
        takerFee: takerFee.toString(),
        price: price.toString(),
        quantity: quantity.toString(),
        token,
    };
}

function handlePerpTrade(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): TradeEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    
    // Based on Mango v4 IDL, the order for perpPlaceOrder is:
    // [group, account, owner, perpMarket, bids, asks, eventQueue, oracle]
    const [group, mangoAccount, owner, perpMarket, bids, asks, eventQueue, oracle] = accounts;

    const { side, price, quantity, maxBaseQuantity, maxQuoteQuantity, clientOrderId, orderType, reduceOnly, expiryTimestamp, limit } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const token = getPerpMarketSymbol(perpMarket.toBase58());

    return {
        signature,
        eventType: 'perpTrade',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        perpMarket: perpMarket.toBase58(),
        side: side === 0 ? 'buy' : 'sell',
        price: price.toString(),
        quantity: quantity.toString(),
        clientOrderId: clientOrderId.toString(),
        orderType,
        reduceOnly,
        token,
        owner: owner.toBase58(),
        maxBaseQuantity: maxBaseQuantity.toString(),
        maxQuoteQuantity: maxQuoteQuantity.toString(),
        expiryTimestamp: expiryTimestamp.toString(),
        limit: limit.toString(),
    };
}

function handleTokenSwap(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): SwapEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    
    // Based on Mango v4 IDL, the order for tokenConditionalSwapTrigger is:
    // [group, account, owner, buyBank, sellBank, buyOracle, sellOracle]
    const [group, mangoAccount, owner, buyBank, sellBank, buyOracle, sellOracle] = accounts;

    const { maxBuyTokenToRelease, maxSellTokenToRelease, buyTokenIndex, sellTokenIndex } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const buyToken = getTokenSymbol(buyTokenIndex);
    const sellToken = getTokenSymbol(sellTokenIndex);

    return {
        signature,
        eventType: 'tokenConditionalSwap',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        buyTokenIndex,
        sellTokenIndex,
        buyToken,
        sellToken,
        owner: owner.toBase58(),
        buyBank: buyBank.toBase58(),
        sellBank: sellBank.toBase58(),
        maxBuyTokenToRelease: maxBuyTokenToRelease.toString(),
        maxSellTokenToRelease: maxSellTokenToRelease.toString(),
    };
}

function handleLiquidation(
    decodedIx: any,
    ix: any,
    signature: string,
    blockTime: number | null | undefined,
    signers: string[],
    staticAccountKeys: PublicKey[]
): LiquidationEvent {
    const { accountKeyIndexes } = ix;
    const accounts = accountKeyIndexes.map((index: number) => staticAccountKeys[index]);
    
    // Based on Mango v4 IDL, the order for liquidateTokenAndToken is:
    // [group, account, assetBank, liabBank, assetOracle, liabOracle, liqor, liqorOwner, liqee]
    const [group, mangoAccount, assetBank, liabBank, assetOracle, liabOracle, liqor, liqorOwner, liqee] = accounts;

    const { maxLiabTransfer, assetTokenIndex, liabTokenIndex } = decodedIx.data;
    const timestamp = blockTime ? blockTime * 1000 : Date.now();
    const assetToken = getTokenSymbol(assetTokenIndex);
    const liabToken = getTokenSymbol(liabTokenIndex);

    return {
        signature,
        eventType: 'liquidation',
        mangoAccount: mangoAccount.toBase58(),
        timestamp,
        groupPubkey: group.toBase58(),
        signers,
        liqor: liqor.toBase58(),
        liqee: liqee.toBase58(),
        assetTokenIndex,
        liabTokenIndex,
        assetToken,
        liabToken,
        assetBank: assetBank.toBase58(),
        liabBank: liabBank.toBase58(),
        maxLiabTransfer: maxLiabTransfer.toString(),
    };
}

function getTokenSymbol(tokenIndex: number): string {
    const mangoGroup = getMangoGroup();
    const token = mangoGroup.getFirstBankByTokenIndex(tokenIndex);
    return token.name;
}

function getPerpMarketSymbol(marketIndex: number): string {
    const mangoGroup = getMangoGroup();
    const perpMarkets = mangoGroup.getPerpMarketByMarketIndex(marketIndex);
    return perpMarkets.name;
}