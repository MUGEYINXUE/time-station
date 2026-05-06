"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("两次密码不一致");
      return;
    }

    if (password.length < 6) {
      setError("密码至少6位");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "注册失败");
        return;
      }

      router.push("/login");
    } catch {
      setError("注册失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gradient-warm mb-2">
            开始记录
          </h1>
          <p className="text-ink-400">创建你的时光驿站</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <User className="w-3.5 h-3.5 inline mr-1" />昵称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="你怎么称呼自己"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <Mail className="w-3.5 h-3.5 inline mr-1" />邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <Lock className="w-3.5 h-3.5 inline mr-1" />密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="至少6位"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-300 mb-1.5">
              <Lock className="w-3.5 h-3.5 inline mr-1" />确认密码
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="再次输入密码"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-mood-angry text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? "注册中..." : "注册"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-400 mt-6">
          已有账号？{" "}
          <Link href="/login" className="text-river-400 hover:text-river-300">
            登录
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
