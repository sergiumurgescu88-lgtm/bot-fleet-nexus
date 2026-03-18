import { useState } from "react";
import { useFleet } from "@/hooks/useFleet";
import { useBot } from "@/hooks/useBot";
import FleetBar from "@/components/FleetBar";
import FleetSummary from "@/components/FleetSummary";
import BotHeader from "@/components/BotHeader";
import PortfolioCard from "@/components/PortfolioCard";
import SignalsTable from "@/components/SignalsTable";
import PositionsPanel from "@/components/PositionsPanel";
import TradeHistory from "@/components/TradeHistory";
import PerformanceChart from "@/components/PerformanceChart";

const Index = () => {
  const { snapshots, loading: fleetLoading } = useFleet();
  const [selectedBotId, setSelectedBotId] = useState<string>("alpha");
  const { snapshot, trades, signals, positions, loading: botLoading } = useBot(selectedBotId);
  const [activeTab, setActiveTab] = useState<"trades" | "chart" | "signals">("trades");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fleet Bar */}
      <div className="border-b border-border py-2">
        <FleetBar snapshots={snapshots} selectedBotId={selectedBotId} onSelectBot={setSelectedBotId} />
      </div>

      {/* Fleet Summary */}
      <div className="py-3">
        <FleetSummary snapshots={snapshots} />
      </div>

      {/* Bot Header */}
      <div className="py-2">
        <BotHeader snapshot={snapshot} botId={selectedBotId} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3">
        {/* Column 1 — Portfolio */}
        <div className="md:col-span-1">
          <PortfolioCard snapshot={snapshot} />
        </div>

        {/* Column 2 — Signals */}
        <div className="md:col-span-2">
          <SignalsTable signals={signals} />
        </div>

        {/* Column 3 — Positions */}
        <div className="md:col-span-1">
          <PositionsPanel positions={positions} />
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="p-3">
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="flex border-b border-border">
            {(["trades", "chart", "signals"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase transition-colors ${
                  activeTab === tab
                    ? "bg-primary/10 text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "trades" ? "Trade History" : tab === "chart" ? "Performance" : "Live Signals"}
              </button>
            ))}
          </div>
          <div>
            {activeTab === "trades" && <TradeHistory trades={trades} />}
            {activeTab === "chart" && <PerformanceChart botId={selectedBotId} />}
            {activeTab === "signals" && <SignalsTable signals={signals} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
