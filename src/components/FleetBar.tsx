import { BOTS, type Bot } from "@/constants/bots";
import type { PortfolioSnapshot } from "@/types/database";

interface FleetBarProps {
  snapshots: Record<string, PortfolioSnapshot>;
  selectedBotId: string | null;
  onSelectBot: (id: string) => void;
}

function isOnline(updatedAt: string) {
  return Date.now() - new Date(updatedAt).getTime() < 10 * 60 * 1000;
}

function formatMoney(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatPct(n: number) {
  const sign = n >= 0 ? "+" : "";
  return sign + n.toFixed(1) + "%";
}

function BotCard({ bot, snap, selected, onClick }: { bot: Bot; snap?: PortfolioSnapshot; selected: boolean; onClick: () => void }) {
  const online = snap ? isOnline(snap.updated_at) : false;
  const pnlPositive = snap ? snap.pnl_pct >= 0 : true;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-lg border bg-card p-3 text-card-foreground transition-all hover:brightness-110 min-w-[110px]"
      style={{
        borderColor: selected ? bot.color : "hsl(var(--border))",
        boxShadow: selected ? `0 0 20px -5px ${bot.color}60` : "none",
      }}
    >
      <div className="flex items-center gap-1 text-sm font-semibold">
        <span>{bot.icon}</span>
        <span>{bot.name}</span>
      </div>
      {snap ? (
        <>
          <span className="font-mono text-sm font-bold">{formatMoney(snap.equity)}</span>
          <span className={`font-mono text-xs font-medium ${pnlPositive ? "text-profit" : "text-loss"}`}>
            {formatPct(snap.pnl_pct)}
          </span>
        </>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      )}
      <div className="flex items-center gap-1 text-[10px]">
        <span
          className={`inline-block h-2 w-2 rounded-full ${online ? "bg-profit animate-pulse-live" : "bg-muted-foreground"}`}
        />
        <span className={online ? "text-profit" : "text-muted-foreground"}>{online ? "LIVE" : "OFFLINE"}</span>
      </div>
    </button>
  );
}

export default function FleetBar({ snapshots, selectedBotId, onSelectBot }: FleetBarProps) {
  return (
    <div className="flex flex-wrap gap-2 p-3">
      {BOTS.map((bot) => (
        <BotCard
          key={bot.id}
          bot={bot}
          snap={snapshots[bot.id]}
          selected={selectedBotId === bot.id}
          onClick={() => onSelectBot(bot.id)}
        />
      ))}
    </div>
  );
}
