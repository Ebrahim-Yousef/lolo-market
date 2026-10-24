import React, { useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "../common/Skeleton";
import { Pagination } from "../common/Pagination";
import type { Product } from "../../types/product";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
  onQuickView: (product: Product) => void;
}

const ITEMS_PER_PAGE = 8;

export const ProductGrid: React.FC<ProductGridProps> = ({ onQuickView }) => {
  const { items, status, filters } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevFilters, setPrevFilters] = useState(filters);

  // Adjust state during render to avoid useEffect set-state warnings
  if (prevFilters !== filters) {
    setPrevFilters(filters);
    setCurrentPage(1);
  }

  const filteredProducts = useMemo(() => {
    return items
      .filter((product) => {
        const matchesSearch =
          product.title
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase());

        const matchesCategory =
          filters.category === "all" || product.category === filters.category;

        const matchesPrice = product.price <= filters.priceRange[1];

        const matchesRating = product.rating >= filters.minRating;

        return (
          matchesSearch && matchesCategory && matchesPrice && matchesRating
        );
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating-desc") return b.rating - a.rating;
        if (filters.sortBy === "title-asc")
          return a.title.localeCompare(b.title);
        return 0;
      });
  }, [items, filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/70 p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-xs">
        <div className="p-4 bg-slate-50 text-slate-400 rounded-full">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-slate-800">
          لم نجد أي نتائج متطابقة
        </h4>
        <p className="text-xs text-slate-400 max-w-sm">
          جرب تغيير كلمات البحث أو إعادة ضبط الفلاتر للحصول على نتائج أكثر.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
      />
    </div>
  );
};
