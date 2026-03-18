import type { Trade } from "@/types/database";

interface TradeHistoryProps {
  trades: Trade[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
  if (trades.length === 0)
    return <div className="text-muted-foreground text-sm p-4">No trades yet</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b bg-muted/50 text-muted-foreground">
            <th className="px-3 py-2 text-left">TIME</th>
            <th className="px-3 py-2 text-left">SYMBOL</th>
            <th className="px-3 py-2 text-center">ACTION</th>
            <th className="px-3 py-2 text-right">QTY</th>
            <th className="px-3 py-2 text-right">PRICE</th>
            <th className="px-3 py-2 text-right">VALUE</th>
            <th className="px-3 py-2 text-center">CONF</th>
            <th className="px-3 py-2 text-right">P&L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => {
            const isBuy = t.action?.toUpperCase() === "BUY";
            const plPos = (t.pl ?? 0) >= 0;
            return (
              <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="px-3 py-2 font-mono text-muted-foreground">
                  {new Date(t.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="px-3 py-2 font-mono font-bold">{t.symbol}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${isBuy ? "bg-profit text-primary-foreground" : "bg-loss text-primary-foreground"}`}>
                    {t.action?.toUpperCase()}
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-right">{t.qty}</td>
                <td className="px-3 py-2 font-mono text-right">${t.price?.toFixed(2)}</td>
                <td className="px-3 py-2 font-mono text-right">${t.value?.toFixed(2)}</td>
                <td className="px-3 py-2 font-mono text-center">{t.confidence}%</td>
                <td className={`px-3 py-2 font-mono text-right font-bold ${plPos ? "text-profit" : "text-loss"}`}>
                  {t.pl != null ? `${plPos ? "+" : ""}$${t.pl.toFixed(2)}` : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
