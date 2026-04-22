"use client";

import { motion } from "framer-motion";
import { BookOpen, MoreVertical, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    name: "Advanced Artificial Intelligence",
    code: "CS402",
    progress: 75,
    instructor: "Dr. Alan Turing",
    grade: "A-",
    status: "In Progress"
  },
  {
    id: 2,
    name: "Distributed Systems & Cloud",
    code: "CS405",
    progress: 45,
    instructor: "Prof. Leslie Lamport",
    grade: "B+",
    status: "In Progress"
  },
  {
    id: 3,
    name: "Data Warehousing (Stitch Lab)",
    code: "DB302",
    progress: 100,
    instructor: "Stitch Engineering Team",
    grade: "A",
    status: "Completed"
  }
];

export function CourseCard({ course, index }: { course: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/30 group transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
          <BookOpen className="h-5 w-5" />
        </div>
        <button className="text-zinc-600 hover:text-zinc-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-xs font-bold text-indigo-500 mb-1">{course.code}</p>
        <h4 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">{course.name}</h4>
        <p className="text-xs text-zinc-500 mt-2">Instructor: {course.instructor}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Progress</span>
          <span className="text-zinc-300 font-medium">{course.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
          />
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center text-xs text-zinc-400">
          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
          Current Grade: <span className="text-zinc-200 font-bold ml-1">{course.grade}</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          course.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'
        }`}>
          {course.status}
        </span>
      </div>
    </motion.div>
  );
}

export function CourseGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}
