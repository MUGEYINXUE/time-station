"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import type { Milestone } from "@/types/milestone";
import { CATEGORY_CONFIG } from "@/types/milestone";

export default function MapPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Milestone | null>(null);

  useEffect(() => {
    fetch("/api/milestones")
      .then((res) => res.json())
      .then((data) => setMilestones(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const locationMilestones = milestones.filter((m) => m.locationName);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-serif text-3xl font-bold text-gradient-river mb-8"
      >
        人生地图
      </motion.h1>

      <div className="glass-card overflow-hidden" style={{ height: "60vh" }}>
        <div className="relative w-full h-full bg-ink-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            {locationMilestones.length > 0 ? (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    <line x1="0" y1="200" x2="800" y2="200" stroke="#4ecdc4" strokeWidth="0.5" />
                    <line x1="400" y1="0" x2="400" y2="400" stroke="#4ecdc4" strokeWidth="0.5" />
                    {[100, 200, 300, 500, 600, 700].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#4ecdc4" strokeWidth="0.2" />
                    ))}
                    {[100, 300].map((y) => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#4ecdc4" strokeWidth="0.2" />
                    ))}
                  </svg>
                </div>

                {locationMilestones.map((m, idx) => {
                  const x = 100 + (idx * 600) / Math.max(locationMilestones.length - 1, 1);
                  const y = 150 + Math.sin(idx * 0.8) * 80;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="absolute cursor-pointer group"
                      style={{ left: `${(x / 800) * 100}%`, top: `${(y / 400) * 100}%` }}
                      onClick={() => setSelected(m)}
                    >
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-river-400 border-2 border-ink-950 shadow-lg shadow-river-400/30 group-hover:scale-150 transition-transform" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-ink-200 opacity-0 group-hover:opacity-100 transition-opacity bg-ink-900/80 px-2 py-1 rounded">
                          {m.locationName}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {locationMilestones.length > 1 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {locationMilestones.slice(0, -1).map((m, idx) => {
                      const x1 = 100 + (idx * 600) / Math.max(locationMilestones.length - 1, 1);
                      const y1 = 150 + Math.sin(idx * 0.8) * 80;
                      const x2 = 100 + ((idx + 1) * 600) / Math.max(locationMilestones.length - 1, 1);
                      const y2 = 150 + Math.sin((idx + 1) * 0.8) * 80;
                      return (
                        <line
                          key={idx}
                          x1={`${x1 / 8}%`}
                          y1={`${y1 / 4}%`}
                          x2={`${x2 / 8}%`}
                          y2={`${y2 / 4}%`}
                          stroke="#4ecdc4"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          opacity="0.3"
                        />
                      );
                    })}
                  </svg>
                )}
              </div>
            ) : (
              <div className="text-center">
                <MapPin className="w-16 h-16 text-ink-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-ink-300 mb-2">还没有地点标记</h3>
                <p className="text-ink-500 text-sm">
                  在里程碑中添加地点，它们会出现在这里
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 mt-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4 text-river-400" />
                <span className="text-river-400 text-sm">{selected.locationName}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink-100">
                {selected.title}
              </h3>
              {selected.content && (
                <p className="text-sm text-ink-400 mt-1">{selected.content}</p>
              )}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-ink-500 hover:text-ink-300 text-sm"
            >
              关闭
            </button>
          </div>
        </motion.div>
      )}

      {locationMilestones.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from(new Set(locationMilestones.map((m) => m.locationName!))).map(
            (loc) => {
              const count = locationMilestones.filter(
                (m) => m.locationName === loc
              ).length;
              return (
                <div
                  key={loc}
                  className="glass-card p-3 text-center cursor-pointer hover:border-river-400/20 transition-all"
                >
                  <MapPin className="w-4 h-4 text-river-400 mx-auto mb-1" />
                  <p className="text-sm font-medium text-ink-200">{loc}</p>
                  <p className="text-xs text-ink-500">{count} 个里程碑</p>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
