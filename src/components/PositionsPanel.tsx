import type { OpenPosition } from "@/types/database";

interface PositionsPanelProps {
  positions: OpenPosition[];
}

export default function PositionsPanel({ positions }: PositionsPanelProps) {
  if (positions.length === 0)
    return <div className="rounded-lg border bg-card p-4 text-muted-foreground text-sm">No open positions</div>;

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="text-xs text-muted-foreground font-semibold mb-2">OPEN POSITIONS</div>
      {positions.map((p) => {
        const pos = p.unrealized_pl >= 0;
        return (
          <div key={p.id} className="rounded border border-border/50 p-3 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold text-sm">{p.symbol}</span>
              <span className="font-mono text-xs text-muted-foreground">qty: {p.qty}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">${p.current_price?.toFixed(2)}</span>
              <span>Entry: ${p.avg_entry?.toFixed(2)}</span>
            </div>
            <div className={`text-xs font-mono font-bold ${pos ? "text-profit" : "text-loss"}`}>
              P&L: {pos ? "+" : ""}${p.unrealized_pl?.toFixed(2)} ({pos ? "+" : ""}{p.unrealized_pct?.toFixed(1)}%)
            </div>
          </div>
        );
      })}
    </div>
  );
}
