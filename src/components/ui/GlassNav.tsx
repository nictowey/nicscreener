import type { FC } from "react";

const navItems = [
  { label: "Overview", href: "#" },
  { label: "Watchlist", href: "#" },
  { label: "Settings", href: "#" }
];

const GlassNav: FC = () => {
  return (
    <header className="glass-surface sticky top-0 z-20 mx-auto mt-8 w-full max-w-6xl rounded-2xl border border-white/10 px-8 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/70" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Market Intelligence</p>
            <h1 className="text-lg font-semibold text-white">Alpha Console</h1>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative transition-all duration-200 hover:text-white"
            >
              {item.label}
              <span className="absolute inset-x-1 -bottom-2 h-0.5 scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default GlassNav;
