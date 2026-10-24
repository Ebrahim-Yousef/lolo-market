import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeFromWishlist, clearWishlist } from "../../store/wishlistSlice";
import { addToCart } from "../../store/cartSlice";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { Button } from "../../components/common/Button";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { addToast } = useToast();

  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  if (!isOpen) return null;

  const confirmSingleDeletion = () => {
    if (itemToDelete) {
      dispatch(removeFromWishlist(itemToDelete.id));
      addToast({
        type: "error",
        title: "تم الحذف من المفضلات",
        description: `تمت إزالة "${itemToDelete.title}" من القائمة.`,
      });
      setItemToDelete(null);
    }
  };

  const confirmClearWishlist = () => {
    dispatch(clearWishlist());
    setIsClearConfirmOpen(false);
    addToast({ type: "info", title: "تم تفريغ قائمة المفضلات بالكامل" });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#111322] dark:text-white shadow-2xl flex flex-col border-l border-slate-200/80 dark:border-indigo-950/60">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-indigo-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                المفضلات (Wishlist)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.length === 0 ? (
              <p className="text-center py-12 text-slate-400 text-sm">
                قائمة المفضلات فارغة.
              </p>
            ) : (
              wishlistItems.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 border border-slate-100 dark:border-indigo-950/80 bg-white dark:bg-[#161a2e] rounded-2xl items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 object-contain bg-slate-50 dark:bg-slate-900 rounded-xl p-1"
                    />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {product.title}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-300 font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        dispatch(addToCart({ product }));
                        addToast({
                          type: "success",
                          title: "تمت الإضافة للسلة",
                          description: product.title,
                        });
                      }}
                      className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-xl cursor-pointer"
                      aria-label="إضافة للسلة"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setItemToDelete({
                          id: product.id,
                          title: product.title,
                        })
                      }
                      className="p-2 text-slate-300 dark:text-slate-500 hover:text-rose-500 rounded-xl transition-colors cursor-pointer"
                      aria-label="حذف من المفضلات"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistItems.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-indigo-950/60 bg-slate-50/50 dark:bg-[#0d0f1a]">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                onClick={() => setIsClearConfirmOpen(true)}
              >
                تفريغ المفضلات بالكامل
              </Button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmSingleDeletion}
        title="حذف من المفضلات"
        message={`هل أنت متأكد من رغبتك في إزالة "${itemToDelete?.title}" من المفضلات؟`}
      />

      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={confirmClearWishlist}
        title="تفريغ المفضلات"
        message="هل أنت متأكد من رغبتك في حذف جميع المنتجات من المفضلات؟"
      />
    </div>
  );
};
