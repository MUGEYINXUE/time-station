"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { X, Calendar, MapPin, Tag, Heart, Lock, ImagePlus } from "lucide-react";
import type { Milestone, MilestoneFormData } from "@/types/milestone";
import { CATEGORY_CONFIG, MOOD_OPTIONS, type MilestoneCategory } from "@/types/milestone";

interface MilestoneEditorProps {
  milestone?: Milestone | null;
  onClose: () => void;
  onSave: () => void;
}

export default function MilestoneEditor({
  milestone,
  onClose,
  onSave,
}: MilestoneEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MilestoneFormData>({
    title: milestone?.title || "",
    content: milestone?.content || "",
    date: milestone?.date
      ? new Date(milestone.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    datePrecision: milestone?.datePrecision || "day",
    category: milestone?.category || "life",
    mood: milestone?.mood || undefined,
    isPrivate: milestone?.isPrivate || false,
    locationName: milestone?.locationName || "",
    tagNames: milestone?.tags.map((t) => t.name) || [],
  });
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = "/api/milestones";
      const method = milestone ? "PUT" : "POST";
      const body = milestone ? { ...form, id: milestone.id } : form;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSave();
      }
    } catch (err) {
      console.error("保存失败:", err);
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    const name = tagInput.trim();
    if (name && !form.tagNames?.includes(name)) {
      setForm({ ...form, tagNames: [...(form.tagNames || []), name] });
      setTagInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-semibold text-ink-100">
            {milestone ? "编辑里程碑" : "添加里程碑"}
          </h2>
          <button onClick={onClose} className="text-ink-500 hover:text-ink-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">标题 *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
              placeholder="这个里程碑叫什么..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">内容</label>
            <textarea
              value={form.content || ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="input-field min-h-[120px] resize-y"
              placeholder="记录这一刻的心情与故事..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-300 mb-1.5">
                <Calendar className="w-3.5 h-3.5 inline mr-1" />日期 *
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-300 mb-1.5">日期精度</label>
              <select
                value={form.datePrecision}
                onChange={(e) => setForm({ ...form, datePrecision: e.target.value as any })}
                className="input-field"
              >
                <option value="day">精确到日</option>
                <option value="month">精确到月</option>
                <option value="year">精确到年</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">分类</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_CONFIG) as MilestoneCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                    form.category === cat
                      ? "bg-river-400/20 text-river-400 border border-river-400/30"
                      : "bg-ink-800/30 text-ink-400 border border-ink-700/30"
                  }`}
                >
                  {CATEGORY_CONFIG[cat].icon} {CATEGORY_CONFIG[cat].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <Heart className="w-3.5 h-3.5 inline mr-1" />心情
            </label>
            <div className="flex gap-2">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setForm({ ...form, mood: option.value, moodColor: option.color })}
                  className={`px-3 py-2 rounded-lg text-xs transition-all ${
                    form.mood === option.value
                      ? "border border-river-400/30 scale-105"
                      : "border border-transparent"
                  }`}
                  style={{
                    backgroundColor:
                      form.mood === option.value ? `${option.color}20` : "rgba(26,26,46,0.3)",
                    color: form.mood === option.value ? option.color : "#b8a88e",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />地点
            </label>
            <input
              type="text"
              value={form.locationName || ""}
              onChange={(e) => setForm({ ...form, locationName: e.target.value })}
              className="input-field"
              placeholder="在哪里发生的..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <Tag className="w-3.5 h-3.5 inline mr-1" />标签
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tagNames?.map((name) => (
                <span
                  key={name}
                  className="px-2.5 py-1 rounded-lg text-xs bg-river-400/10 text-river-400 border border-river-400/20 flex items-center gap-1.5"
                >
                  #{name}
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, tagNames: form.tagNames?.filter((t) => t !== name) })
                    }
                    className="text-river-400/50 hover:text-river-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="input-field flex-1"
                placeholder="输入标签名，回车添加"
              />
              <button type="button" onClick={addTag} className="btn-secondary text-sm">
                添加
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, isPrivate: !form.isPrivate })}
              className={`p-2 rounded-lg transition-all ${
                form.isPrivate ? "bg-river-400/10 text-river-400" : "text-ink-500"
              }`}
            >
              <Lock className="w-4 h-4" />
            </button>
            <span className="text-xs text-ink-400">
              {form.isPrivate ? "仅自己可见" : "公开可见"}
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              取消
            </button>
            <button
              type="submit"
              disabled={saving || !form.title}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "保存中..." : milestone ? "更新" : "创建"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
