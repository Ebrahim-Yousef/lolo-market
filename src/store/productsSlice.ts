import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Product,
  ProductsAPIResponse,
  FilterState,
} from "../types/product";

interface ProductsState {
  items: Product[];
  categories: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: FilterState;
}

const initialFilters: FilterState = {
  searchQuery: "",
  category: "all",
  priceRange: [0, 2000],
  minRating: 0,
  sortBy: "default",
};

const initialState: ProductsState = {
  items: [],
  categories: [],
  status: "idle",
  error: null,
  filters: initialFilters,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    if (!response.ok) {
      throw new Error("فشل في جلب المنتجات من السيرفر.");
    }
    const data: ProductsAPIResponse = await response.json();
    return data.products;
  },
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch(
      "https://dummyjson.com/products/category-list",
    );
    if (!response.ok) {
      throw new Error("فشل في جلب قائمة الفئات.");
    }
    const data: string[] = await response.json();
    return data;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.filters.minRating = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState["sortBy"]>) => {
      state.filters.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "حدث خطأ غير متوقع";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
