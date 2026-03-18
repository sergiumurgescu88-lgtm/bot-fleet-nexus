import type { Signal } from "@/types/database";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SignalsTableProps {
  signals: Signal[];
}

function actionColor(action: string) {
  const a = action?.toUpperCase();
  if (a === "BUY") return "bg-profit text-primary-foreground";
  if (a === "SELL") return "bg-loss text-primary-foreground";
  return "bg-muted text-muted-foreground";
}

function rsiColor(rsi: number) {
  if (rsi < 30 || rsi > 70) return "text-loss";
  if (rsi >= 30 && rsi < 50) return "text-profit";
  return "text-warning";
}

export default function SignalsTable({ signals }: SignalsTableProps) {
  if (signals.length === 0)
    return <div className="rounded-lg border bg-card p-4 text-muted-foreground text-sm">No signals</div>;

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-muted/50 text-muted-foreground">
              <th className="px-3 py-2 text-left">SYMBOL</th>
              <th className="px-3 py-2 text-right">PRICE</th>
              <th className="px-3 py-2 text-center">ACTION</th>
              <th className="px-3 py-2 text-center">CONF%</th>
              <th className="px-3 py-2 text-center">RSI</th>
              <th className="px-3 py-2 text-left">STRATEGY</th>
              <th className="px-3 py-2 text-left hidden md:table-cell">REASONING</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((s) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="px-3 py-2 font-mono font-bold">{s.symbol}</td>
                <td className="px-3 py-2 font-mono text-right">${s.price?.toFixed(2)}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${actionColor(s.action)}`}>
                    {s.action?.toUpperCase()}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(s.confidence, 100)}%` }} />
                    </div>
                    <span className="font-mono">{s.confidence}%</span>
                  </div>
                </td>
                <td className={`px-3 py-2 text-center font-mono ${rsiColor(s.rsi)}`}>{s.rsi?.toFixed(1)}</td>
                <td className="px-3 py-2 text-muted-foreground">{s.strategy}</td>
                <td className="px-3 py-2 text-muted-foreground hidden md:table-cell max-w-[200px]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help truncate block">
                        {s.reasoning?.length > 60 ? s.reasoning.slice(0, 60) + "…" : s.reasoning}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">{s.reasoning}</TooltipContent>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
