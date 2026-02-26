import { clsx } from "clsx";
import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <div className={clsx("rounded-3xl bg-white shadow-floating ring-1 ring-slate-100", className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={clsx("p-6 md:p-8", className)}>{children}</div>;
}
