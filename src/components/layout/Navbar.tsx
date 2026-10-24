import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Store,
  Filter,
  Search,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearchQuery } from "../../store/productsSlice";
import { useTheme } from "../../hooks/useTheme";

interface NavbarProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenMobileFilter?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenWishlist,
  onOpenMobileFilter,
}) => {
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useTheme();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
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

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Mobile Filter Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onOpenMobileFilter && (
            <button
              onClick={onOpenMobileFilter}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="فتح الفلاتر"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-2 sm:p-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl sm:rounded-2xl shadow-indigo-500/30 shadow-md shrink-0">
              <Store className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight truncate block leading-tight">
                lolo
                <span className="text-indigo-600 dark:text-indigo-400">
                  Market
                </span>
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium hidden xs:block truncate">
                Luxury Commercial Suite
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Global Search Input (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="ابحث عن منتج، ماركة، أو تفاصيل..."
              className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-2xl pl-11 pr-10 py-2.5 transition-all duration-200 focus:outline-hidden focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400"
            />
            {term && (
              <button
                onClick={() => setTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Actions (Theme Toggle, Wishlist, Cart) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer"
            aria-label="تغيير المظهر"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 sm:p-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer"
            aria-label="المفضلات"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex items-center justify-center min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] px-0.5 bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-slate-900">
                {wishlistItems.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-sm sm:shadow-lg shadow-indigo-500/20 cursor-pointer"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-semibold hidden md:inline">
              السلة
            </span>
            {totalCartCount > 0 && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] px-1 bg-emerald-500 text-white text-[9px] sm:text-[10px] font-extrabold rounded-full">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
