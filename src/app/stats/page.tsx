"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, Tag, Heart } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Milestone } from "@/types/milestone";
import { CATEGORY_CONFIG } from "@/types/milestone";

const PIE_COLORS = [
  "#4ecdc4",
  "#ffd93d",
  "#ff6b9d",
  "#7c9cbf",
  "#35b8b0",
  "#e74c3c",
  "#a8d8ea",
  "#cc9f00",
];

export default function StatsPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/milestones")
      .then((res) => res.json())
      .then((data) => setMilestones(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categoryData = Object.entries(
    milestones.reduce(
      (acc, m) => {
        const label = CATEGORY_CONFIG[m.category]?.label || m.category;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    )
  ).map(([name, value]) => ({ name, value }));

  const moodData = milestones
    .filter((m) => m.mood)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((m) => ({
      date: new Date(m.date).toLocaleDateString("zh-CN", { month: "short" }),
      mood: m.mood,
    }));

  const thisDayMonth = new Date();
  const sameDayMilestones = milestones.filter((m) => {
    const d = new Date(m.date);
    return (
      d.getMonth() === thisDayMonth.getMonth() &&
      d.getDate() === thisDayMonth.getDate() &&
      d.getFullYear() !== thisDayMonth.getFullYear()
    );
  });

  const allTags = milestones
    .flatMap((m) => m.tags)
    .reduce(
      (acc, t) => {
        acc[t.name] = (acc[t.name] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  const topTags = Object.entries(allTags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-river-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-serif text-3xl font-bold text-gradient-warm mb-8"
      >
        时光统计
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink-200 mb-4">
            <TrendingUp className="w-5 h-5 text-river-400" />
            人生阶段分布
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(26,26,46,0.9)",
                    border: "1px solid rgba(78,205,196,0.2)",
                    borderRadius: "8px",
                    color: "#f5f0e8",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-ink-500 text-center py-12">暂无数据</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink-200 mb-4">
            <Heart className="w-5 h-5 text-mood-love" />
            心情趋势
          </h3>
          {moodData.length > 1 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(78,205,196,0.1)" />
                <XAxis dataKey="date" stroke="#b8a88e" fontSize={12} />
                <YAxis domain={[1, 5]} stroke="#b8a88e" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(26,26,46,0.9)",
                    border: "1px solid rgba(78,205,196,0.2)",
                    borderRadius: "8px",
                    color: "#f5f0e8",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#4ecdc4"
                  strokeWidth={2}
                  dot={{ fill: "#4ecdc4", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-ink-500 text-center py-12">暂无心情数据</p>
          )}
        </motion.div>
      </div>

      {sameDayMilestones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink-200 mb-4">
            <Calendar className="w-5 h-5 text-memory-300" />
            那年今日
          </h3>
          <div className="space-y-3">
            {sameDayMilestones.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-ink-800/30 border border-ink-700/20"
              >
                <span className="text-sm text-ink-500 shrink-0">
                  {new Date(m.date).getFullYear()}年
                </span>
                <span className="font-serif text-ink-200">{m.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {topTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink-200 mb-4">
            <Tag className="w-5 h-5 text-river-400" />
            人生关键词
          </h3>
          <div className="flex flex-wrap gap-3">
            {topTags.map(([name, count], idx) => (
              <span
                key={name}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-105"
                style={{
                  fontSize: `${Math.min(14 + count * 2, 24)}px`,
                  color: PIE_COLORS[idx % PIE_COLORS.length],
                  borderColor: `${PIE_COLORS[idx % PIE_COLORS.length]}30`,
                  backgroundColor: `${PIE_COLORS[idx % PIE_COLORS.length]}10`,
                }}
              >
                #{name}
                <span className="ml-1 text-ink-500 text-xs">({count})</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {milestones.length === 0 && (
        <div className="text-center py-16">
          <p className="text-ink-400 font-serif text-lg">
            记录你的第一个里程碑，开始生成统计
          </p>
        </div>
      )}
    </div>
  );
}
