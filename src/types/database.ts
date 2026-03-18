export interface PortfolioSnapshot {
  id: string;
  bot_id: string;
  cycle: number;
  equity: number;
  cash: number;
  pnl: number;
  pnl_pct: number;
  open_positions: number;
  total_trades: number;
  total_pl: number;
  market_trend: string;
  safe_mode: boolean;
  updated_at: string;
}

export interface Trade {
  id: string;
  bot_id: string;
  symbol: string;
  action: string;
  qty: number;
  price: number;
  value: number;
  confidence: number;
  close_type: string;
  pl: number;
  timestamp: string;
}

export interface Signal {
  id: string;
  bot_id: string;
  symbol: string;
  action: string;
  confidence: number;
  price: number;
  rsi: number;
  reasoning: string;
  strategy: string;
  updated_at: string;
}

export interface OpenPosition {
  id: string;
  bot_id: string;
  symbol: string;
  qty: number;
  avg_entry: number;
  current_price: number;
  unrealized_pl: number;
  unrealized_pct: number;
  updated_at: string;
}
