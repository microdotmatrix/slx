import clsx from "clsx";
import { cn } from "@/lib/utils";

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

export const Skeleton = ({ className, ...props }: { className: string }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
};

export const SkeletonCard = ({
  isLoading,
  ...props
}: {
  isLoading: boolean;
}) => (
  <div
    className={clsx(
      "rounded-2xl bg-gray-900/80 p-4",
      isLoading ? `${shimmer}` : null,
    )}
  >
    <div className="space-y-3">
      <div className="h-14 rounded-lg bg-slate-200" />
      <div className="h-3 w-11/12 rounded-lg bg-gray-300" />
      <div className="h-3 w-8/12 rounded-lg bg-gray-300" />
    </div>
  </div>
);

export function FlyLoader() {
  return (
    <div className="relative aspect-square w-full rounded-md bg-white shadow-inner">
      <div className="absolute flex h-full w-full flex-col justify-center overflow-hidden">
        <div className="animate-fly absolute left-8 h-4 w-4 rounded-full bg-gray-800"></div>
        <div
          style={{
            animationDelay: "500ms",
          }}
          className="animate-fly absolute left-8 h-4 w-4 rounded-full bg-gray-600"
        ></div>
        <div
          style={{
            animationDelay: "1000ms",
          }}
          className="animate-fly absolute left-8 h-4 w-4 rounded-full bg-gray-900"
        ></div>
      </div>
    </div>
  );
}

export function Pulser() {
  return (
    <div className="grid aspect-square w-full place-content-center rounded-md bg-white shadow-inner">
      <span className="relative grid h-8 w-8 place-content-center">
        <span className="absolute h-full w-full animate-ping rounded-full bg-gray-500 opacity-75"></span>
        <span className="h-5 w-5 rounded-full bg-gray-600"></span>
      </span>
    </div>
  );
}

export function Orbit() {
  return (
    <div className="loader">
      <div className={cn("orb", "[--index:0]")} />
      <div className={cn("orb", "[--index:1]")} />
      <div className={cn("orb", "[--index:2]")} />
      <div className={cn("orb", "[--index:3]")} />
      <div className={cn("orb", "[--index:4]")} />
    </div>
  );
}
