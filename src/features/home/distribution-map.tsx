"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { LucideGlobe2, LucideMapPin, LucideShip, LucideTruck } from "lucide-react";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

export function DistributionMap() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.distribution");
  const mapRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: LucideTruck, label: "National Distribution", value: "85%" },
    { icon: LucideShip, label: "Regional Export", value: "15%" },
    { icon: LucideMapPin, label: "Active Hubs", value: "12+" },
  ];

  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window === "undefined" || !mapRef.current) return;
      
      const L = (await import("leaflet")).default;

      if (mapRef.current.querySelector(".leaflet-container")) return;

      const ethiopiaBounds: [[number, number], [number, number]] = [
        [3.5, 33],
        [15, 48.5]
      ];

      const map = L.map(mapRef.current, {
        center: [9.45, 37.75],
        zoom: 6,
        minZoom: 5,
        maxZoom: 10,
        maxBounds: ethiopiaBounds,
        maxBoundsViscosity: 1.0,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width: 20px; height: 20px; background: #ea580c; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(234,88,12,0.5);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker([9.45, 37.75], { icon }).addTo(map)
        .bindPopup("<strong>Fincha Sugar Factory</strong><br>Fincha Valley, Oromia");

      map.fitBounds(ethiopiaBounds);
    };

    loadLeaflet();
  }, []);

  return (
    <SectionContainer className="bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-12">
          <SectionHeading 
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Icon size={20} />
                  </div>
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Map with Leaflet */}
        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl">
          <div 
            ref={mapRef} 
            className="w-full h-full rounded-[40px]"
            style={{ minHeight: "400px" }}
          />
          
          {/* Overlay info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg z-[1000]">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-slate-900">Fincha Sugar Factory</span>
            </div>
            <a 
              href="https://www.openstreetmap.org/?mlat=9.45&amp;mlon=37.75#map=12/9.45/37.75" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View on Map
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
