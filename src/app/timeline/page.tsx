"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, X } from "lucide-react";
import Timeline from "@/components/timeline/Timeline";
import MilestoneEditor from "./MilestoneEditor";
import type { Milestone } from "@/types/milestone";
import { CATEGORY_CONFIG, type MilestoneCategory } from "@/types/milestone";

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [filterCategory, setFilterCategory] = useState<MilestoneCategory | "all">("all");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const res = await fetch("/api/milestones");
      if (res.ok) {
        const data = await res.json();
        setMilestones(data);
      }
    } catch (err) {
      console.error("获取里程碑失败:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMilestoneClick = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setShowEditor(true);
  };

  const handleSave = async () => {
    setShowEditor(false);
    setEditingMilestone(null);
    await fetchMilestones();
  };

  const filteredMilestones =
    filterCategory === "all"
      ? milestones
      : milestones.filter((m) => m.category === filterCategory);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-3xl font-bold text-gradient-river"
          >
            时间轴
          </motion.h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              筛选
            </button>
            <button
              onClick={() => {
                setEditingMilestone(null);
                setShowEditor(true);
              }}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              添加里程碑
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-4 mb-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-ink-300">按分类筛选</span>
                <button onClick={() => setShowFilter(false)} className="text-ink-500 hover:text-ink-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filterCategory === "all"
                      ? "bg-river-400/20 text-river-400 border border-river-400/30"
                      : "bg-ink-800/30 text-ink-400 border border-ink-700/30 hover:border-ink-600/50"
                  }`}
                >
                  全部
                </button>
                {(Object.keys(CATEGORY_CONFIG) as MilestoneCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                      filterCategory === cat
                        ? "bg-river-400/20 text-river-400 border border-river-400/30"
                        : "bg-ink-800/30 text-ink-400 border border-ink-700/30 hover:border-ink-600/50"
                    }`}
                  >
                    {CATEGORY_CONFIG[cat].icon} {CATEGORY_CONFIG[cat].label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-river-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <Timeline
          milestones={filteredMilestones}
          onAddClick={() => setShowEditor(true)}
          onMilestoneClick={handleMilestoneClick}
        />
      )}

      <AnimatePresence>
        {showEditor && (
          <MilestoneEditor
            milestone={editingMilestone}
            onClose={() => {
              setShowEditor(false);
              setEditingMilestone(null);
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
