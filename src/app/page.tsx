"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Sparkles, BookOpen } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "沉浸式时间轴",
    desc: "垂直滚动的时光河流，每个里程碑都是一段记忆的涟漪",
    gradient: "from-river-400 to-river-600",
  },
  {
    icon: MapPin,
    title: "人生地图",
    desc: "在地图上标记你走过的每座城市，连成独一无二的轨迹",
    gradient: "from-mood-love to-memory-300",
  },
  {
    icon: Sparkles,
    title: "那年今日",
    desc: "自动回溯同月同日的历史里程碑，让记忆与当下重逢",
    gradient: "from-memory-300 to-memory-500",
  },
  {
    icon: BookOpen,
    title: "纪念册导出",
    desc: "选定时间范围，生成精美 PDF 纪念册，留存纸间的温度",
    gradient: "from-river-400 to-mood-love",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient-mixed">时光驿站</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            每个人的人生都是一条独一无二的河流
          </p>
          <p className="text-base md:text-lg text-ink-400 max-w-xl mx-auto mb-10">
            记录关键节点，回溯来路，在快节奏生活中停下来，回望来时的方向
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-base flex items-center gap-2">
              开始记录
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/timeline" className="btn-secondary text-base flex items-center gap-2">
              浏览时间轴
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-river-400/30 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-river-400"
            />
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink-100 mb-4">
            用<span className="text-gradient-river">温度</span>记录每一段时光
          </h2>
          <p className="text-ink-400 max-w-lg mx-auto">
            不只是冰冷的数据，而是承载情感的数字纪念册
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card-hover p-8 group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-ink-950" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-ink-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-ink-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-serif text-2xl md:text-3xl text-ink-200 italic mb-8">
            &ldquo;记住走过的路，才能看清要去的方向&rdquo;
          </p>
          <Link href="/register" className="btn-primary text-base inline-flex items-center gap-2">
            开启你的时光之旅
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
