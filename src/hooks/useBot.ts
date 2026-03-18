import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { PortfolioSnapshot, Trade, Signal, OpenPosition } from "@/types/database";

export function useBot(botId: string | null) {
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [positions, setPositions] = useState<OpenPosition[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!botId) return;
    setLoading(true);

    const fetch = async () => {
      const [snapRes, tradesRes, signalsRes, posRes] = await Promise.all([
        supabase.from("portfolio_snapshot").select("*").eq("bot_id", botId).order("updated_at", { ascending: false }).limit(1),
        supabase.from("trades").select("*").eq("bot_id", botId).order("timestamp", { ascending: false }).limit(50),
        supabase.from("signals").select("*").eq("bot_id", botId).order("updated_at", { ascending: false }).limit(20),
        supabase.from("open_positions").select("*").eq("bot_id", botId).order("updated_at", { ascending: false }),
      ]);

      if (snapRes.data?.[0]) setSnapshot(snapRes.data[0] as PortfolioSnapshot);
      if (tradesRes.data) setTrades(tradesRes.data as Trade[]);
      if (signalsRes.data) setSignals(signalsRes.data as Signal[]);
      if (posRes.data) setPositions(posRes.data as OpenPosition[]);
      setLoading(false);
    };

    fetch();

    const channel = supabase
      .channel(`bot-${botId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "portfolio_snapshot", filter: `bot_id=eq.${botId}` }, (p) => {
        if (p.new) setSnapshot(p.new as PortfolioSnapshot);
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "trades", filter: `bot_id=eq.${botId}` }, (p) => {
        if (p.new) setTrades((prev) => [p.new as Trade, ...prev].slice(0, 50));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "signals", filter: `bot_id=eq.${botId}` }, (p) => {
        if (p.new) setSignals((prev) => {
          const updated = [p.new as Signal, ...prev.filter((s) => s.id !== (p.new as Signal).id)];
          return updated.slice(0, 20);
        });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "open_positions", filter: `bot_id=eq.${botId}` }, (p) => {
        if (p.eventType === "DELETE") {
          setPositions((prev) => prev.filter((pos) => pos.id !== (p.old as any).id));
        } else if (p.new) {
          setPositions((prev) => {
            const exists = prev.findIndex((pos) => pos.id === (p.new as OpenPosition).id);
            if (exists >= 0) {
              const copy = [...prev];
              copy[exists] = p.new as OpenPosition;
              return copy;
            }
            return [p.new as OpenPosition, ...prev];
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [botId]);

  return { snapshot, trades, signals, positions, loading };
}
