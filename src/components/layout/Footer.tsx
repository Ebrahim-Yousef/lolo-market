import React, { useState } from "react";
import {
  Store,
  Code,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  Heart,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const phoneNumber = "+201018399732";
  const whatsappUrl = `https://wa.me/201018399732`;
  const telUrl = `tel:${phoneNumber}`;

  return (
    <footer className="bg-slate-950 text-slate-400 mt-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/30">
            <Store className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            lolo<span className="text-indigo-500">Market</span>
          </span>
        </div>

        {/* Contact Info (Phone with Options & Email) */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 relative">
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors cursor-pointer bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800"
              title="انقر للتواصل"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span dir="ltr">+20 101 839 9732</span>
            </button>

            {showOptions && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 w-44 z-50 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                <a
                  href={telUrl}
                  onClick={() => setShowOptions(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-right"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>اتصال هاتفي</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowOptions(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-right"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>رسالة واتساب</span>
                </a>
              </div>
            )}
          </div>

          <span className="text-slate-700">•</span>

          <a
            href="mailto:ebrahim.yousef.dev@gmail.com"
            className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>ebrahim.yousef.dev@gmail.com</span>
          </a>
        </div>

        {/* Developer Rights & GitHub */}
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Developed by</span>
            <span className="font-bold text-white">Ebrahim Yousef</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>

          <a
            href="https://github.com/Ebrahim-Yousef"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all font-medium border border-slate-800"
          >
            <Code className="w-4 h-4 text-indigo-400" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </footer>
  );
};
