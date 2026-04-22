import { CourseGrid } from "@/components/dashboard/course-grid";
import { Search, Filter, Plus } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">My Courses</h1>
          <p className="text-zinc-500 mt-1">Manage your active units and track assignment progress.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-white premium-gradient rounded-lg hover:opacity-90 transition-all flex items-center shadow-lg shadow-indigo-500/20">
            <Plus className="h-4 w-4 mr-2" />
            Enroll in New Unit
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Filter courses..." 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>
        <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-200 transition-colors">
          <Filter className="h-4 w-4" />
        </button>
      </div>

      <CourseGrid />
    </div>
  );
}
