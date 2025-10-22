import type { FC, PropsWithChildren, ReactNode } from "react";

type GlassPanelProps = PropsWithChildren<{
  title?: ReactNode;
  className?: string;
}>;

const GlassPanel: FC<GlassPanelProps> = ({ title, children, className = "" }) => {
  return (
    <section className={`glass-surface flex flex-col rounded-3xl border-white/10 p-6 ${className}`}>
      {title ? (
        <header className="mb-6">
          <h2 className="glass-section-title">{title}</h2>
        </header>
      ) : null}
      <div className="flex-1 space-y-6">{children}</div>
    </section>
  );
};

export default GlassPanel;
