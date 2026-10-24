export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsAPIResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "title-asc";

export interface FilterState {
  searchQuery: string;
  category: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: SortOption;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
