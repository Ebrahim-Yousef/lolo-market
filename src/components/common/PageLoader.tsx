import React from "react";
import { Store } from "lucide-react";

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white">
      <div className="absolute w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative flex items-center justify-center mb-6">
        <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <div className="absolute p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
          <Store className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className="text-center space-y-2 z-10">
        <h2 className="text-2xl font-black tracking-tight">
          lolo<span className="text-indigo-400">Market</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium tracking-wide animate-pulse">
          جاري تحميل المتجر...
        </p>
      </div>
    </div>
  );
};
