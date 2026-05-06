"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import MilestoneCard from "./MilestoneCard";
import type { Milestone } from "@/types/milestone";

interface TimelineProps {
  milestones: Milestone[];
  onAddClick?: () => void;
  onMilestoneClick?: (milestone: Milestone) => void;
}

export default function Timeline({
  milestones,
  onAddClick,
  onMilestoneClick,
}: TimelineProps) {
  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const groupedByYear = sortedMilestones.reduce(
    (groups, milestone) => {
      const year = new Date(milestone.date).getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(milestone);
      return groups;
    },
    {} as Record<number, Milestone[]>
  );

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-river-400/30 via-river-400/15 to-transparent" />

      {years.map((year) => (
        <div key={year} className="relative mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 flex justify-center mb-8"
          >
            <div className="px-6 py-2 rounded-full bg-ink-900/80 border border-river-400/20 backdrop-blur-sm">
              <span className="font-serif text-2xl font-bold text-gradient-river">
                {year}
              </span>
            </div>
          </motion.div>

          <div className="relative space-y-6 md:space-y-8">
            {groupedByYear[year].map((milestone, idx) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                index={idx}
                onClick={onMilestoneClick}
              />
            ))}
          </div>
        </div>
      ))}

      {milestones.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-river-400/10 flex items-center justify-center">
            <Clock className="w-10 h-10 text-river-400" />
          </div>
          <h3 className="font-serif text-xl text-ink-200 mb-2">
            时间轴还是空的
          </h3>
          <p className="text-ink-400 mb-6">
            记录你的第一个里程碑，开始你的时光之旅
          </p>
          <button onClick={onAddClick} className="btn-primary flex items-center gap-2 mx-auto">
            <Plus className="w-4 h-4" />
            添加里程碑
          </button>
        </motion.div>
      )}
    </div>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
