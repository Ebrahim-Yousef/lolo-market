import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

interface WishlistState {
  items: Product[];
}

const loadWishlistFromStorage = (): Product[] => {
  try {
    const stored = localStorage.getItem("lolo_wishlist");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load wishlist from localStorage", error);
    return [];
  }
};

const saveWishlistToStorage = (items: Product[]) => {
  try {
    localStorage.setItem("lolo_wishlist", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save wishlist to localStorage", error);
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToStorage(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
