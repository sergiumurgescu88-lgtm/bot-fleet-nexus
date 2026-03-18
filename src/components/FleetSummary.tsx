import type { PortfolioSnapshot } from "@/types/database";

interface FleetSummaryProps {
  snapshots: Record<string, PortfolioSnapshot>;
}

function isOnline(updatedAt: string) {
  return Date.now() - new Date(updatedAt).getTime() < 10 * 60 * 1000;
}

export default function FleetSummary({ snapshots }: FleetSummaryProps) {
  const values = Object.values(snapshots);
  const totalEquity = values.reduce((s, v) => s + v.equity, 0);
  const totalPl = values.reduce((s, v) => s + v.pnl, 0);
  const totalTrades = values.reduce((s, v) => s + v.total_trades, 0);
  const activeBots = values.filter((v) => isOnline(v.updated_at)).length;
  const totalBots = 9;
  const avgPct = values.length > 0 ? values.reduce((s, v) => s + v.pnl_pct, 0) / values.length : 0;
  const positive = totalPl >= 0;

  return (
    <div className="flex flex-wrap items-center gap-6 rounded-lg border border-border bg-card px-5 py-3 mx-3 font-mono text-sm">
      <div>
        <span className="text-muted-foreground text-xs mr-2">FLEET EQUITY</span>
        <span className="font-bold">${totalEquity.toLocaleString()}</span>
      </div>
      <div>
        <span className="text-muted-foreground text-xs mr-2">TOTAL P&L</span>
        <span className={`font-bold ${positive ? "text-profit" : "text-loss"}`}>
          {positive ? "+" : ""}${totalPl.toLocaleString()} ({positive ? "+" : ""}{avgPct.toFixed(1)}%)
        </span>
      </div>
      <div>
        <span className="text-muted-foreground text-xs mr-2">ACTIVE</span>
        <span className="font-bold">{activeBots}/{totalBots}</span>
      </div>
      <div>
        <span className="text-muted-foreground text-xs mr-2">TRADES</span>
        <span className="font-bold">{totalTrades}</span>
      </div>
    </div>
  );
}
