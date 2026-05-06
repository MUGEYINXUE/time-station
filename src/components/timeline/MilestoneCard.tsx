"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Lock, Heart } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Milestone } from "@/types/milestone";
import { CATEGORY_CONFIG, MOOD_OPTIONS } from "@/types/milestone";

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  onClick?: (milestone: Milestone) => void;
}

export default function MilestoneCard({
  milestone,
  index,
  onClick,
}: MilestoneCardProps) {
  const isLeft = index % 2 === 0;
  const categoryConfig = CATEGORY_CONFIG[milestone.category];
  const moodOption = milestone.mood
    ? MOOD_OPTIONS.find((m) => m.value === milestone.mood)
    : null;

  const formatDate = () => {
    const date = new Date(milestone.date);
    switch (milestone.datePrecision) {
      case "year":
        return format(date, "yyyy年", { locale: zhCN });
      case "month":
        return format(date, "yyyy年M月", { locale: zhCN });
      default:
        return format(date, "yyyy年M月d日", { locale: zhCN });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative w-full md:w-[calc(50%-2rem)] ${
        isLeft ? "md:mr-auto" : "md:ml-auto"
      }`}
    >
      <div
        onClick={() => onClick?.(milestone)}
        className="glass-card-hover p-6 cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{categoryConfig.icon}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full bg-${categoryConfig.color}-400/10 text-${categoryConfig.color}-400`}
            >
              {categoryConfig.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {milestone.isPrivate && (
              <Lock className="w-3.5 h-3.5 text-ink-500" />
            )}
            {moodOption && (
              <Heart
                className="w-3.5 h-3.5"
                style={{ color: moodOption.color }}
                fill={moodOption.color}
              />
            )}
          </div>
        </div>

        <h3 className="font-serif text-lg font-semibold text-ink-50 mb-2 group-hover:text-river-400 transition-colors">
          {milestone.title}
        </h3>

        {milestone.content && (
          <p className="text-sm text-ink-300 line-clamp-2 mb-3 leading-relaxed">
            {milestone.content}
          </p>
        )}

        {milestone.media && milestone.media.length > 0 && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            {milestone.media.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-ink-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.url}
                  alt={m.caption || ""}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-ink-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate()}</span>
          </div>
          {milestone.locationName && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{milestone.locationName}</span>
            </div>
          )}
        </div>

        {milestone.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {milestone.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-0.5 rounded-full bg-ink-800/50 text-ink-400 border border-ink-700/30"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-river-400 bg-ink-950 z-10 ${
          isLeft ? "-right-[2.35rem]" : "-left-[2.35rem]"
        }`}
      >
        <div className="absolute inset-1 rounded-full bg-river-400 animate-pulse-slow" />
      </div>
    </motion.div>
  );
}
