"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, BookCheck, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: string;
  icon: any;
  color: "indigo" | "emerald" | "amber" | "rose";
  delay?: number;
}

const colorMap = {
  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/5",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5",
  rose: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5",
};

export function StatCard({ title, value, description, trend, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-2xl"
      )}
    >
      <div className="flex items-center justify-between">
        <div className={cn("p-3 rounded-xl border transition-all duration-300 group-hover:scale-110", colorMap[color])}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend}
          </span>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
        <div className="flex items-baseline space-x-2 mt-1">
          <p className="text-3xl font-bold text-zinc-100">{value}</p>
        </div>
        <p className="text-xs text-zinc-500 mt-2">{description}</p>
      </div>
    </motion.div>
  );
}

export function StatCardsGrid({ data }: { data: any }) {
  if (!data) return null;

  const stats = [
    {
      title: "Current GPA",
      value: data.gpa,
      description: "Academic performance (Last Semester)",
      trend: "+0.3",
      icon: GraduationCap,
      color: "indigo" as const,
    },
    {
      title: "Attendance Rate",
      value: `${data.attendance}%`,
      description: "Based on real-time check-ins",
      trend: "+2%",
      icon: Users,
      color: "emerald" as const,
    },
    {
      title: "Course Progress",
      value: `${data.currentProgress}%`,
      description: "Overall completion across all units",
      icon: BookCheck,
      color: "amber" as const,
    },
    {
      title: "Live Status",
      value: data.status === 'in-class' ? 'Active' : 'Offline',
      description: data.currentClass || "Next: Advanced AI",
      icon: TrendingUp,
      color: "rose" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={stat.title} {...stat} delay={i * 0.1} />
      ))}
    </div>
  );
}
