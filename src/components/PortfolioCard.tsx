import type { PortfolioSnapshot } from "@/types/database";

interface PortfolioCardProps {
  snapshot: PortfolioSnapshot | null;
}

export default function PortfolioCard({ snapshot }: PortfolioCardProps) {
  if (!snapshot) return <div className="rounded-lg border bg-card p-4 text-muted-foreground text-sm">No portfolio data</div>;

  const pnlPos = snapshot.total_pl >= 0;
  const cashPct = snapshot.equity > 0 ? (snapshot.cash / snapshot.equity) * 100 : 0;
  const winRate = snapshot.total_trades > 0 ? 65 : 0; // placeholder — would need wins column

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div>
        <div className="text-xs text-muted-foreground mb-1">EQUITY</div>
        <div className="font-mono text-2xl font-bold">${snapshot.equity.toLocaleString()}</div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>CASH</span>
          <span className="font-mono">${snapshot.cash.toLocaleString()}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(cashPct, 100)}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-muted-foreground">Total Trades</div>
          <div className="font-mono font-bold">{snapshot.total_trades}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Total P&L</div>
          <div className={`font-mono font-bold ${pnlPos ? "text-profit" : "text-loss"}`}>
            {pnlPos ? "+" : ""}${snapshot.total_pl.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Market</div>
          <div className="font-mono text-sm">{snapshot.market_trend || "—"}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Safe Mode</div>
          <div className={`font-mono text-sm ${snapshot.safe_mode ? "text-warning" : "text-profit"}`}>
            {snapshot.safe_mode ? "ON" : "OFF"}
          </div>
        </div>
      </div>
    </div>
  );
}
