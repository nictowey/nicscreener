import type { FC, PropsWithChildren, ReactNode } from "react";

type GlassCardProps = PropsWithChildren<{
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  actions?: ReactNode;
}>;

const GlassCard: FC<GlassCardProps> = ({ title, description, actions, className = "", children }) => {
  return (
    <div className={`glass-surface rounded-3xl border-white/10 p-6 ${className}`}>
      {(title || description || actions) && (
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title ? <h3 className="text-base font-semibold text-white">{title}</h3> : null}
            {description ? <p className="text-sm text-slate-400">{description}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      )}
      <div>{children}</div>
    </div>
  );
};

export default GlassCard;
