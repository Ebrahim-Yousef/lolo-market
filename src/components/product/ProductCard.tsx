import React, { useState } from "react";
import type { Product } from "../../types/product";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { toggleWishlist } from "../../store/wishlistSlice";
import { useToast } from "../../hooks/useToast";
import { Badge } from "../common/Badge";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { addToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      dispatch(addToCart({ product, quantity: 1 }));
      addToast({
        type: "success",
        title: "تمت الإضافة للسلة",
        description: `تمت إضافة "${product.title}" بنجاح.`,
      });
      setIsAdding(false);
    }, 250);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    addToast({
      type: isWishlisted ? "info" : "success",
      title: isWishlisted ? "تم الحذف من المفضلات" : "تمت الإضافة للمفضلات",
      description: product.title,
    });
  };

  return (
    <div className="group relative bg-white dark:bg-[#131629] dark:text-white rounded-3xl border border-slate-200/80 dark:border-indigo-950/80 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Thumbnail Box */}
        <div className="relative w-full aspect-square bg-slate-100/80 dark:bg-slate-900/50 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.discountPercentage > 0 && (
              <Badge variant="rose">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 z-30 p-2.5 rounded-2xl backdrop-blur-md transition-all duration-200 shadow-sm cursor-pointer pointer-events-auto ${
              isWishlisted
                ? "bg-rose-50 text-rose-500 fill-rose-500 dark:bg-rose-500/20 dark:text-rose-400"
                : "bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800"
            }`}
            aria-label="قائمة الرغبات"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 dark:fill-rose-400" : ""}`}
            />
          </button>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
            <button
              onClick={() => onQuickView(product)}
              className="px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold rounded-xl shadow-xl flex items-center gap-1.5 hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer pointer-events-auto"
            >
              <Eye className="w-4 h-4" /> معاينة سريعة
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 font-medium">
            <span className="uppercase tracking-wider">
              {product.brand || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-300 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Add */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-indigo-950">
        <div>
          <span className="text-lg font-black text-slate-900 dark:text-white">
            ${product.price}
          </span>
          {product.discountPercentage > 0 && (
            <span className="block text-xs text-slate-400 line-through">
              $
              {(product.price * (1 + product.discountPercentage / 100)).toFixed(
                2,
              )}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="p-3 bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-50"
          aria-label="إضافة للسلة"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
