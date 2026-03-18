export interface Bot {
  id: string;
  name: string;
  icon: string;
  dir: string;
  color: string;
}

export const BOTS: Bot[] = [
  { id: "alpha",     name: "ALPHA",      icon: "⚡", dir: "neurotrade",        color: "#00D4F5" },
  { id: "beta",      name: "BETA",       icon: "🔷", dir: "neurotrade-v2",     color: "#7C3AED" },
  { id: "gamma",     name: "GAMMA",      icon: "🔶", dir: "neurotrade-v3",     color: "#F59E0B" },
  { id: "z1",        name: "Z1",         icon: "🌀", dir: "neurotrade-v5",     color: "#10B981" },
  { id: "zeus",      name: "ZEUS",       icon: "⚡", dir: "neurotrade-zeus",   color: "#EAB308" },
  { id: "omega",     name: "OMEGA",      icon: "🌊", dir: "neurotrade-omega",  color: "#3B82F6" },
  { id: "apollo",    name: "APOLLO",     icon: "🚀", dir: "neurotrade-apollo", color: "#EC4899" },
  { id: "hermes",    name: "HERMES",     icon: "☿",  dir: "neurotrade-hermes", color: "#14B8A6" },
  { id: "hermes_x5", name: "HERMES X5",  icon: "💎", dir: "hermes-v2",        color: "#F97316" },
];
