import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchProducts, fetchCategories } from "./store/productsSlice";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ProductFilter } from "./components/product/ProductFilter";
import { ProductGrid } from "./components/product/ProductGrid";
import { ProductQuickView } from "./components/product/ProductQuickView";
import { CartDrawer } from "./features/cart/CartDrawer";
import { WishlistDrawer } from "./features/wishlist/WishlistDrawer";
import { ToastContainer } from "./components/common/ToastContainer";
import type { Product } from "./types/product";
import { PageLoader } from "./components/common/PageLoader";
import { Sparkles, ArrowRight } from "lucide-react";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading" && items.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090b14] flex flex-col font-sans text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Sticky Glassmorphism Navbar with Embedded Search */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
      />

      {/* Premium Luxury Hero Banner with Ambient Mesh Glow */}
      <div className="relative overflow-hidden bg-slate-900 dark:bg-[#0f172a] border-b border-slate-800/80 transition-colors py-10 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-600/30 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-600/20 dark:bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/15 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>مجموعة صيف 2026 الحصرية</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug text-white">
              اكتشف أحدث المنتجات العالمية مع{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-300">
                loloMarket
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-xl">
              تشكيلة واسعة مختارة بعناية لأفضل الماركات العالمية، تمزج بين
              الجودة العالية والأسعار التنافسية والتوصيل السريع.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>تسوق الآن</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        id="catalog"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-28 bg-white dark:bg-[#131629] dark:text-white rounded-3xl border border-slate-200/80 dark:border-indigo-950/80 p-6 shadow-xl">
            <ProductFilter />
          </aside>

          {/* Mobile Filter Drawer - Sleek Single-Layer Surface */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
              <div
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={() => setIsMobileFilterOpen(false)}
              />

              <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-xs bg-white dark:bg-[#111322] dark:text-white border-l border-slate-200/80 dark:border-indigo-950/60 shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
                  <ProductFilter
                    onCloseMobile={() => setIsMobileFilterOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid Section */}
          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                المنتجات المتاحة
              </h2>
            </div>
            <ProductGrid onQuickView={(prod) => setQuickViewProduct(prod)} />
          </section>
        </div>
      </main>

      {/* Commercial Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
