"use client";

import dynamic from "next/dynamic";

const VideoFeaturette = dynamic(
  () => import("@features/home/video-featurette").then((mod) => ({ default: mod.VideoFeaturette })),
  {
    loading: () => <div className="h-[80vh] min-h-[600px] bg-slate-900 animate-pulse" />,
    ssr: false,
  }
);

const DistributionMap = dynamic(
  () => import("@features/home/distribution-map").then((mod) => ({ default: mod.DistributionMap })),
  {
    loading: () => <div className="h-[500px] bg-slate-50 animate-pulse" />,
    ssr: false,
  }
);

export function ClientVideoFeaturette() {
  return <VideoFeaturette />;
}

export function ClientDistributionMap() {
  return <DistributionMap />;
}
