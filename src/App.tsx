import { useMemo, useState } from "react";
import GlassCard from "./components/ui/GlassCard";
import GlassNav from "./components/ui/GlassNav";
import GlassPanel from "./components/ui/GlassPanel";

type MarketCapOption = "Mega" | "Large" | "Mid" | "Small" | "Micro";
type SectorOption =
  | "Technology"
  | "Healthcare"
  | "Financials"
  | "Energy"
  | "Consumer"
  | "Industrial";
type SignalOption = "Potential Breakouts" | "Undervalued Fundamentals" | "Momentum Leaders";

type ScreeningResult = {
  ticker: string;
  company: string;
  signal: SignalOption;
  price: string;
};

const MARKET_CAP_OPTIONS: MarketCapOption[] = ["Mega", "Large", "Mid", "Small", "Micro"];
const SECTOR_OPTIONS: SectorOption[] = [
  "Technology",
  "Healthcare",
  "Financials",
  "Energy",
  "Consumer",
  "Industrial"
];
const SIGNAL_OPTIONS: SignalOption[] = [
  "Potential Breakouts",
  "Undervalued Fundamentals",
  "Momentum Leaders"
];

const MOCK_DATA: ScreeningResult[] = [
  { ticker: "AAPL", company: "Apple Inc.", signal: "Momentum Leaders", price: "$178.23" },
  { ticker: "NVDA", company: "NVIDIA Corp.", signal: "Potential Breakouts", price: "$924.12" },
  { ticker: "MSFT", company: "Microsoft", signal: "Momentum Leaders", price: "$415.76" },
  { ticker: "AMZN", company: "Amazon.com", signal: "Undervalued Fundamentals", price: "$177.58" },
  { ticker: "TSLA", company: "Tesla", signal: "Potential Breakouts", price: "$201.88" },
  { ticker: "META", company: "Meta Platforms", signal: "Momentum Leaders", price: "$486.81" },
  { ticker: "NFLX", company: "Netflix", signal: "Potential Breakouts", price: "$606.98" },
  { ticker: "GOOGL", company: "Alphabet", signal: "Undervalued Fundamentals", price: "$153.24" },
  { ticker: "CRM", company: "Salesforce", signal: "Momentum Leaders", price: "$302.47" },
  { ticker: "AMD", company: "Advanced Micro Devices", signal: "Potential Breakouts", price: "$181.53" }
];

const App = () => {
  const [marketCap, setMarketCap] = useState<MarketCapOption | "">("");
  const [sector, setSector] = useState<SectorOption | "">("");
  const [activeSignals, setActiveSignals] = useState<SignalOption[]>([]);
  const [timeframe, setTimeframe] = useState("1W");
  const [isScreening, setIsScreening] = useState(false);
  const [results, setResults] = useState<ScreeningResult[]>([]);

  const skeletonRows = useMemo(() => Array.from({ length: 6 }, (_, index) => index), []);

  const toggleSignal = (signal: SignalOption) => {
    setActiveSignals((prev) =>
      prev.includes(signal) ? prev.filter((item) => item !== signal) : [...prev, signal]
    );
  };

  const applyFilters = () => {
    setIsScreening(true);
    setResults([]);

    setTimeout(() => {
      setResults(MOCK_DATA);
      setIsScreening(false);
    }, 2000);
  };

  return (
    <div className="pb-16">
      <GlassNav />
      <main className="mx-auto mt-10 flex w-full max-w-6xl flex-col gap-8 px-4 pb-10 lg:flex-row">
        <div className="lg:w-[28%]">
          <GlassPanel title="Filters" className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Market Cap
              </p>
              <select
                value={marketCap}
                onChange={(event) => setMarketCap(event.target.value as MarketCapOption | "")}
                className="glass-input"
              >
                <option value="">All Sizes</option>
                {MARKET_CAP_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Sector</p>
              <select
                value={sector}
                onChange={(event) => setSector(event.target.value as SectorOption | "")}
                className="glass-input"
              >
                <option value="">All Sectors</option>
                {SECTOR_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Timeframe</p>
              <div className="grid grid-cols-2 gap-3">
                {["1D", "1W", "1M", "YTD"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTimeframe(option)}
                    className={`glass-button text-xs ${
                      timeframe === option ? "ring-2 ring-primary/60" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Signals</p>
              <div className="space-y-3">
                {SIGNAL_OPTIONS.map((signal) => {
                  const active = activeSignals.includes(signal);
                  return (
                    <label
                      key={signal}
                      className={`glass-surface flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
                        active ? "border-white/30 bg-white/10" : "hover:border-white/20"
                      }`}
                    >
                      <span>{signal}</span>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleSignal(signal)}
                        className="h-4 w-4 accent-primary"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={applyFilters}
                className="glass-button w-full py-3 text-sm"
                disabled={isScreening}
              >
                {isScreening ? "Screening…" : "Apply Filters"}
              </button>
            </div>

            <div className="space-y-1 text-xs text-slate-400">
              <p>Selected: {marketCap || "Any"} Cap • {sector || "Any"} Sector</p>
              <p>
                Signals: {activeSignals.length > 0 ? activeSignals.join(", ") : "All"} • Timeframe: {timeframe}
              </p>
            </div>
          </GlassPanel>
        </div>

        <div className="flex-1 space-y-8">
          <GlassCard
            title="Screening Results"
            description={
              isScreening
                ? "Aggregating signal intelligence across global markets."
                : results.length > 0
                ? `Displaying ${results.length} matches for your filters.`
                : "Adjust filters to surface actionable opportunities."
            }
            actions={
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {isScreening ? "Processing" : "Live Feed"}
              </span>
            }
          >
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.3em] text-slate-400">
                  <tr>
                    <th scope="col" className="px-5 py-4">
                      Ticker
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Company
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Signal
                    </th>
                    <th scope="col" className="px-5 py-4 text-right">
                      Last Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {isScreening
                    ? skeletonRows.map((index) => (
                        <tr key={`skeleton-${index}`} className="transition-colors hover:bg-white/10">
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-white">
                            <span className="inline-flex h-4 w-20 animate-pulse rounded-full bg-white/10" />
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-300">
                            <span className="inline-flex h-4 w-40 animate-pulse rounded-full bg-white/10" />
                          </td>
                          <td className="px-5 py-4 text-sm">
                            <span className="inline-flex h-4 w-32 animate-pulse rounded-full bg-white/10" />
                          </td>
                          <td className="px-5 py-4 text-right text-sm font-semibold text-white">
                            <span className="inline-flex h-4 w-16 animate-pulse rounded-full bg-white/10" />
                          </td>
                        </tr>
                      ))
                    : results.map((result) => (
                        <tr key={result.ticker} className="transition-colors hover:bg-white/10">
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-white">
                            {result.ticker}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-300">{result.company}</td>
                          <td className="px-5 py-4 text-sm">
                            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0.45rem_rgba(56,189,248,0.8)]" />
                              {result.signal}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right text-sm font-semibold text-white">
                            {result.price}
                          </td>
                        </tr>
                      ))}
                  {!isScreening && results.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-12 text-center text-sm text-slate-400">
                        No results yet. Apply filters to generate insights.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard
            title="Performance Snapshot"
            description="Aggregate performance overview for selected cohort"
          >
            <div className="glass-surface flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/20 text-sm text-slate-400">
              Future chart module placeholder
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default App;
