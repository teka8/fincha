"use client";

import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { LucidePlay, LucidePause, LucideVolume2, LucideVolumeX } from "lucide-react";

export function VideoFeaturette() {
  const t = useTranslations("home.video");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-slate-950 flex flex-col justify-end">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/land-o-lakes-inc-PCITNW3g85Q-unsplash.jpg"
        >
          <source src="/videos/sample2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-layout mx-auto w-full px-8 pb-24 flex flex-col md:flex-row items-end justify-between gap-12">
        
        {/* Text Content */}
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-accent shadow-glow-accent animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">
              {t("eyebrow")}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            {t("title")}
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            {t("description")}
          </p>
        </div>

        {/* Video Controls */}
        <div className="shrink-0 flex items-center gap-4">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="size-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/10"
          >
            {isMuted ? (
              <LucideVolumeX size={20} className="text-white" />
            ) : (
              <LucideVolume2 size={20} className="text-white" />
            )}
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="group cursor-pointer relative size-32 md:size-40 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-glow-md"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_20s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity">
              <path id="textPath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text className="text-[10px] uppercase font-bold tracking-[0.2em]" fill="currentColor">
                <textPath href="#textPath" startOffset="0%">{t("cta")} • {t("cta")} • </textPath>
              </text>
            </svg>
            {isPlaying ? (
              <LucidePause size={32} className="text-white fill-white group-hover:text-primary-900 group-hover:fill-primary-900 transition-colors ml-1" />
            ) : (
              <LucidePlay size={32} className="text-white fill-white group-hover:text-primary-900 group-hover:fill-primary-900 transition-colors ml-2" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
