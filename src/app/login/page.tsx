"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/timeline");
        router.refresh();
      }
    } catch {
      setError("登录失败，请重试");
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
          <h1 className="font-serif text-3xl font-bold text-gradient-river mb-2">
            欢迎回来
          </h1>
          <p className="text-ink-400">继续你的时光之旅</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="输入密码"
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
            <LogIn className="w-4 h-4" />
            {loading ? "登录中..." : "登录"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-400 mt-6">
          还没有账号？{" "}
          <Link href="/register" className="text-river-400 hover:text-river-300">
            注册
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
