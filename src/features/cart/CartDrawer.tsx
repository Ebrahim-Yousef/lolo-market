import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/cartSlice";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "../../components/common/Button";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { useToast } from "../../hooks/useToast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { addToast } = useToast();

  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  if (!isOpen) return null;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const confirmSingleDeletion = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      addToast({
        type: "error",
        title: "تم حذف المنتج",
        description: `تمت إزالة "${itemToDelete.title}" من السلة.`,
      });
      setItemToDelete(null);
    }
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setIsClearConfirmOpen(false);
    addToast({ type: "info", title: "تم تفريغ السلة بالكامل" });
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
              <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                سلة التسوق
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <p>السلة فارغة حالياً.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 border border-slate-100 dark:border-indigo-950/80 bg-white dark:bg-[#161a2e] rounded-2xl items-center"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-16 h-16 object-contain bg-slate-50 dark:bg-slate-900 rounded-xl p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.product.title}
                    </h5>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold mt-1">
                      ${item.product.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="p-1 border border-slate-200 dark:border-indigo-900 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-indigo-950 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="p-1 border border-slate-200 dark:border-indigo-900 rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-indigo-950 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setItemToDelete({
                        id: item.product.id,
                        title: item.product.title,
                      })
                    }
                    className="p-2 text-slate-300 dark:text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-indigo-950/60 bg-slate-50/50 dark:bg-[#0d0f1a] space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                <span>الإجمالي:</span>
                <span className="text-xl text-indigo-600 dark:text-indigo-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button className="w-full">إتمام الشراء</Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                onClick={() => setIsClearConfirmOpen(true)}
              >
                تفريغ السلة
              </Button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmSingleDeletion}
        title="حذف المنتج"
        message={`هل أنت متأكد من رغبتك في إزالة "${itemToDelete?.title}" من السلة؟`}
      />

      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={confirmClearCart}
        title="تفريغ السلة"
        message="هل أنت متأكد من رغبتك في حذف جميع المنتجات من السلة بالكامل؟"
      />
    </div>
  );
};
