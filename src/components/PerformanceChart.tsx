import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface PerformanceChartProps {
  botId: string;
}

interface DataPoint {
  cycle: number;
  equity: number;
  pnl: number;
}

export default function PerformanceChart({ botId }: PerformanceChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: rows } = await supabase
        .from("portfolio_snapshot")
        .select("cycle, equity, pnl")
        .eq("bot_id", botId)
        .order("cycle", { ascending: true })
        .limit(200);
      if (rows) setData(rows as DataPoint[]);
    };
    fetch();
  }, [botId]);

  if (data.length === 0) return <div className="text-muted-foreground text-sm p-4">No performance data</div>;

  return (
    <div className="h-64 w-full p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
          <XAxis dataKey="cycle" tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(222 41% 10%)",
              border: "1px solid hsl(222 30% 18%)",
              borderRadius: 4,
              fontSize: 12,
              fontFamily: "JetBrains Mono",
            }}
          />
          <Line type="monotone" dataKey="equity" stroke="#00D4F5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
