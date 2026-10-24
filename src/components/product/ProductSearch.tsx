import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearchQuery } from "../../store/productsSlice";

export const ProductSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(
    (state) => state.products.filters.searchQuery,
  );
  const [term, setTerm] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(term));
    }, 300);

    return () => clearTimeout(handler);
  }, [term, dispatch]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="ابحث عن منتج، ماركة، أو تفاصيل..."
        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-2xl pl-11 pr-10 py-3.5 transition-all duration-200 focus:outline-hidden focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 shadow-xs"
      />
      {term && (
        <button
          onClick={() => setTerm("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
