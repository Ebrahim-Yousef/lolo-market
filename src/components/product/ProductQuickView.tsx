import React, { useState } from "react";
import type { Product } from "../../types/product";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Star, ShoppingBag } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { useToast } from "../../hooks/useToast";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      dispatch(addToCart({ product, quantity: 1 }));
      addToast({
        type: "success",
        title: "تمت الإضافة للسلة",
        description: product.title,
      });
      setIsAdding(false);
      onClose();
    }, 250);
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} maxWidth="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 dark:bg-[#070910] rounded-2xl p-4 flex items-center justify-center aspect-square">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-64 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15 px-2.5 py-1 rounded-full uppercase">
              {product.category}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                {product.rating}
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-400">
                ({product.stock} متوفر في المخزون)
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-300 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-indigo-950 flex items-center justify-between">
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                ${product.price}
              </span>
            </div>
            <Button onClick={handleAdd} isLoading={isAdding} className="gap-2">
              <ShoppingBag className="w-4 h-4" /> إضافة للسلة
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
