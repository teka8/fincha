import { clsx } from "clsx";
import { PropsWithChildren, ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 sm:text-xl">{description}</p>
      )}
    </div>
  );
}

export function SectionContainer({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={clsx("relative w-full py-16 md:py-24", className)}>
      <div className="mx-auto flex w-full max-w-layout flex-col gap-12 px-8 sm:px-12 lg:px-16 xl:px-20">
        {children}
      </div>
    </section>
  );
}
