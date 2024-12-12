export interface BaseMangoEvent {
    signature: string;
    eventType: MangoEventType;
    mangoAccount: string;
    timestamp: number;
    groupPubkey: string;
    signers: string[];  
}

export interface DepositEvent extends BaseMangoEvent {
    eventType: 'tokenDeposit';
    amount: string;
    token: string;
    owner: string;
    bank: string;
    vault: string;
    tokenAccount: string;
}

export interface WithdrawEvent extends BaseMangoEvent {
    eventType: 'tokenWithdraw';
    amount: string;
    token: string;
    owner: string;
    bank: string;
    vault: string;
    tokenAccount: string;
}

export interface TradeEvent extends BaseMangoEvent {
    eventType: 'perpTrade' | 'spotTrade';
    perpMarket?: string;
    serumMarket?: string;
    side: 'buy' | 'sell';
    price: string;
    quantity: string;
    clientOrderId: string;
    orderType: string;
    reduceOnly?: boolean;
    token: string;
    owner: string;
    maxBaseQuantity?: string;
    maxQuoteQuantity?: string;
    expiryTimestamp?: string;
    limit: string;
    openOrders?: string;
    selfTradeBehavior?: string;
}

export interface SwapEvent extends BaseMangoEvent {
    eventType: 'tokenConditionalSwap';
    buyTokenIndex: number;
    sellTokenIndex: number;
    buyToken: string;
    sellToken: string;
    owner: string;
    buyBank: string;
    sellBank: string;
    maxBuyTokenToRelease: string;
    maxSellTokenToRelease: string;
}

export interface LiquidationEvent extends BaseMangoEvent {
    eventType: 'liquidation';
    liqor: string;
    liqee: string;
    assetTokenIndex: number;
    liabTokenIndex: number;
    assetToken: string;
    liabToken: string;
    assetBank: string;
    liabBank: string;
    maxLiabTransfer: string;
}

export interface PerpPlaceOrderEvent extends BaseMangoEvent {
    eventType: 'perpPlaceOrder';
    perpMarket: string;
    side: 'buy' | 'sell';
    price: string;
    quantity: string;
    clientOrderId: string;
    orderType: string;
    reduceOnly: boolean;
    token: string;
    owner: string;
    maxBaseQuantity: string;
    maxQuoteQuantity: string;
    expiryTimestamp: string;
    limit: string;
}

export interface PerpSettlePnlEvent extends BaseMangoEvent {
    eventType: 'perpSettlePnl';
    perpMarket: string;
    token: string;
    accountA: string;
    accountB: string;
}

export interface PerpSettleFeesEvent extends BaseMangoEvent {
    eventType: 'perpSettleFees';
    perpMarket: string;
    token: string;
    feeAccount: string;
}

export interface PerpForceClosePositionEvent extends BaseMangoEvent {
    eventType: 'perpForceClosePosition';
    perpMarket: string;
    token: string;
    liqor: string;
    liqorOwner: string;
    baseTransfer: string;
}

export interface PerpCancelOrderEvent extends BaseMangoEvent {
    eventType: 'perpCancelOrder';
    perpMarket: string;
    orderId: string;
    clientOrderId: string;
    token: string;
    owner: string;
}

export interface PerpCancelAllOrdersEvent extends BaseMangoEvent {
    eventType: 'perpCancelAllOrders';
    perpMarket: string;
    limit: string;
    token: string;
    owner: string;
}

export interface PerpFillEvent extends BaseMangoEvent {
    eventType: 'perpFill';
    perpMarket: string;
    maker: string;
    taker: string;
    makerOrderId: string;
    takerOrderId: string;
    makerFee: string;
    takerFee: string;
    price: string;
    quantity: string;
    token: string;
}

export type MangoEventType = 'tokenDeposit' | 'tokenWithdraw' | 'perpTrade' | 'spotTrade' | 'tokenConditionalSwap' | 'liquidation' | 'perpPlaceOrder' | 'perpSettlePnl' | 'perpSettleFees' | 'perpForceClosePosition' | 'perpCancelOrder' | 'perpCancelAllOrders' | 'perpFill';

export type MangoEvent = DepositEvent | WithdrawEvent | TradeEvent | SwapEvent | LiquidationEvent | PerpPlaceOrderEvent | PerpSettlePnlEvent | PerpSettleFeesEvent | PerpForceClosePositionEvent | PerpCancelOrderEvent | PerpCancelAllOrdersEvent | PerpFillEvent;

export function isDepositEvent(event: MangoEvent): event is DepositEvent {
  return event.eventType === 'tokenDeposit';
}

export function isWithdrawEvent(event: MangoEvent): event is WithdrawEvent {
  return event.eventType === 'tokenWithdraw';
}

export function isTradeEvent(event: MangoEvent): event is TradeEvent {
  return event.eventType === 'perpTrade' || event.eventType === 'spotTrade';
}

export function isSwapEvent(event: MangoEvent): event is SwapEvent {
  return event.eventType === 'tokenConditionalSwap';
}

export function isLiquidationEvent(event: MangoEvent): event is LiquidationEvent {
  return event.eventType === 'liquidation';
}

export function isPerpPlaceOrderEvent(event: MangoEvent): event is PerpPlaceOrderEvent {
  return event.eventType === 'perpPlaceOrder';
}

export function isPerpSettlePnlEvent(event: MangoEvent): event is PerpSettlePnlEvent {
  return event.eventType === 'perpSettlePnl';
}

export function isPerpSettleFeesEvent(event: MangoEvent): event is PerpSettleFeesEvent {
  return event.eventType === 'perpSettleFees';
}

export function isPerpForceClosePositionEvent(event: MangoEvent): event is PerpForceClosePositionEvent {
  return event.eventType === 'perpForceClosePosition';
}

export function isPerpCancelOrderEvent(event: MangoEvent): event is PerpCancelOrderEvent {
  return event.eventType === 'perpCancelOrder';
}

export function isPerpCancelAllOrdersEvent(event: MangoEvent): event is PerpCancelAllOrdersEvent {
  return event.eventType === 'perpCancelAllOrders';
}

export function isPerpFillEvent(event: MangoEvent): event is PerpFillEvent {
  return event.eventType === 'perpFill';
}

export interface BotData {
    id: number;
    name: string;
    status: 'Active' | 'Stopped';
    mangoAccount: string; 
    pnl: {
      value: number;
      percentage: number;
      isPositive: boolean;
      chartData: number[];
    };
    portfolio: number;
    accuracy: number;
    sharpeRatio: number;
    apr: number;
    delegate: string;
    events: {
      event_category: 'deposit' | 'withdraw' | 'trade';
      timestamp: string;
      [key: string]: any;
    }[];
}