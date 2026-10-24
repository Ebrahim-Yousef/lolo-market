import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
} from "../../store/productsSlice";
import { Filter, RotateCcw, Star, X } from "lucide-react";
import type { SortOption } from "../../types/product";

interface ProductFilterProps {
  onCloseMobile?: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  onCloseMobile,
}) => {
  const dispatch = useAppDispatch();
  const { categories, filters } = useAppSelector((state) => state.products);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-indigo-950/60">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold">
          <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>الفلاتر والتصفية</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> إعادة ضبط
          </button>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="إغلاق الفلاتر"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          الفئات
        </label>
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="w-full bg-slate-50 dark:bg-[#070910] border border-slate-200 dark:border-indigo-950 text-slate-800 dark:text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
        >
          <option value="all">كل الفئات</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>السعر الأقصى</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
            ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={filters.priceRange[1]}
          onChange={(e) =>
            dispatch(
              setPriceRange([filters.priceRange[0], Number(e.target.value)]),
            )
          }
          className="w-full accent-indigo-600 dark:accent-indigo-500 cursor-pointer"
        />
      </div>

      {/* Min Rating */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          أقل تقييم
        </label>
        <div className="flex items-center gap-1.5">
          {[0, 3, 4, 4.5].map((rate) => (
            <button
              key={rate}
              onClick={() => dispatch(setMinRating(rate))}
              className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                filters.minRating === rate
                  ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 ring-2 ring-amber-400/20"
                  : "bg-white dark:bg-[#070910] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-indigo-950 hover:bg-slate-50 dark:hover:bg-indigo-950/40"
              }`}
            >
              <span>{rate === 0 ? "الكل" : `${rate}+`}</span>
              {rate > 0 && (
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          ترتيب حسب
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
          className="w-full bg-slate-50 dark:bg-[#070910] border border-slate-200 dark:border-indigo-950 text-slate-800 dark:text-slate-200 text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-indigo-500 cursor-pointer"
        >
          <option value="default">الافتراضي</option>
          <option value="price-asc">السعر: من الأقل للأعلى</option>
          <option value="price-desc">السعر: من الأعلى للأقل</option>
          <option value="rating-desc">الأعلى تقييماً</option>
          <option value="title-asc">الاسم (أ - ي)</option>
        </select>
      </div>
    </div>
  );
};
