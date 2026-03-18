import type { PortfolioSnapshot } from "@/types/database";
import { BOTS } from "@/constants/bots";

interface BotHeaderProps {
  snapshot: PortfolioSnapshot | null;
  botId: string;
}

function isOnline(updatedAt: string) {
  return Date.now() - new Date(updatedAt).getTime() < 10 * 60 * 1000;
}

export default function BotHeader({ snapshot, botId }: BotHeaderProps) {
  const bot = BOTS.find((b) => b.id === botId);
  if (!bot) return null;

  const online = snapshot ? isOnline(snapshot.updated_at) : false;
  const pnlPos = snapshot ? snapshot.pnl >= 0 : true;

  return (
    <div className="flex flex-wrap items-center gap-6 rounded-lg border bg-card px-5 py-4 mx-3"
      style={{ borderColor: bot.color + "40" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{bot.icon}</span>
        <span className="text-xl font-bold" style={{ color: bot.color }}>{bot.name}</span>
        <span className={`flex items-center gap-1 text-xs ml-2 ${online ? "text-profit" : "text-muted-foreground"}`}>
          <span className={`inline-block h-2 w-2 rounded-full ${online ? "bg-profit animate-pulse-live" : "bg-muted-foreground"}`} />
          {online ? "LIVE" : "OFFLINE"}
        </span>
      </div>
      {snapshot && (
        <>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground text-xs mr-1">Cycle</span>
            <span className="font-bold">#{snapshot.cycle}</span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground text-xs mr-1">Updated</span>
            <span>{new Date(snapshot.updated_at).toLocaleTimeString()}</span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground text-xs mr-1">Equity</span>
            <span className="font-bold">${snapshot.equity.toLocaleString()}</span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground text-xs mr-1">Cash</span>
            <span>${snapshot.cash.toLocaleString()}</span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground text-xs mr-1">P&L</span>
            <span className={`font-bold ${pnlPos ? "text-profit" : "text-loss"}`}>
              {pnlPos ? "+" : ""}${snapshot.pnl.toLocaleString()} ({pnlPos ? "+" : ""}{snapshot.pnl_pct.toFixed(2)}%)
            </span>
          </div>
          <div className="font-mono text-sm">
            <span className="text-muted-foreground text-xs mr-1">Positions</span>
            <span>{snapshot.open_positions}</span>
          </div>
        </>
      )}
      {!snapshot && (
        <span className="text-muted-foreground text-sm">No data available</span>
      )}
    </div>
  );
}
