import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BOTS } from "@/constants/bots";
import type { PortfolioSnapshot } from "@/types/database";

export function useFleet() {
  const [snapshots, setSnapshots] = useState<Record<string, PortfolioSnapshot>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase
        .from("portfolio_snapshot")
        .select("*")
        .in("bot_id", BOTS.map((b) => b.id));

      if (data) {
        const map: Record<string, PortfolioSnapshot> = {};
        for (const row of data as PortfolioSnapshot[]) {
          // keep latest per bot
          if (!map[row.bot_id] || new Date(row.updated_at) > new Date(map[row.bot_id].updated_at)) {
            map[row.bot_id] = row;
          }
        }
        setSnapshots(map);
      }
      setLoading(false);
    };

    fetchAll();

    const channel = supabase
      .channel("fleet-overview")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_snapshot" },
        (payload) => {
          const row = payload.new as PortfolioSnapshot;
          if (row && row.bot_id) {
            setSnapshots((prev) => ({ ...prev, [row.bot_id]: row }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { snapshots, loading };
}
