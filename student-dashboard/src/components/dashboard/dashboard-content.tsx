"use client";

import { useQuery } from "@tanstack/react-query";
import { StatCardsGrid } from "@/components/dashboard/stat-cards";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { motion } from "framer-motion";
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  History 
} from "lucide-react";

export default function DashboardContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/summary');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
          ))}
        </div>
        <div className="h-[400px] bg-zinc-900/50 rounded-2xl border border-zinc-800" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-100">Error loading dashboard</h2>
          <p className="text-zinc-500 mt-2">Could not connect to Antigravity/Stitch services.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight text-zinc-100"
          >
            Welcome back, Jane
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 mt-1"
          >
            Here&apos;s what&apos;s happening with your academic progress today.
          </motion.p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors flex items-center">
            <History className="h-4 w-4 mr-2" />
            View History
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white premium-gradient rounded-lg hover:opacity-90 transition-all flex items-center shadow-lg shadow-indigo-500/20">
            Request Tutoring
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <StatCardsGrid data={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart data={data.trends} />
        </div>

        {/* Activity Feed (Real-time events) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 h-full">
            <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              Live Activity
            </h3>
            <div className="space-y-6">
              {data.notifications.map((notif: any, i: number) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  key={notif.id} 
                  className="flex gap-4"
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    {i < data.notifications.length - 1 && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-zinc-800" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{notif.message}</p>
                    <p className="text-xs text-zinc-500 mt-1">Just now • Antigravity Alert</p>
                  </div>
                </motion.div>
              ))}
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Assignment Submitted</p>
                  <p className="text-xs text-zinc-500 mt-1">2 hours ago • LMS Integration</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-all border border-transparent hover:border-zinc-700">
              Show all activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
