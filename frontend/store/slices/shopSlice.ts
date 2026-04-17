import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  features: string[];
  stock: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  totalAmount: number;
  notes?: string;
  createdAt: string;
  items: { product: Product; quantity: number; unitPrice: number }[];
}

interface ShopState {
  products: Product[];
  categories: ProductCategory[];
  cart: CartItem[];
  myOrders: Order[];
  loading: boolean;
  orderLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ShopState = {
  products: [],
  categories: [],
  cart: [],
  myOrders: [],
  loading: false,
  orderLoading: false,
  error: null,
  successMessage: null,
};

export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/shop/products");
      return res.data.products as Product[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch products",
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "shop/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/shop/categories");
      return res.data.categories as ProductCategory[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch categories",
      );
    }
  },
);

export const placeOrder = createAsyncThunk(
  "shop/placeOrder",
  async (
    items: { productId: number; quantity: number }[],
    { rejectWithValue },
  ) => {
    try {
      const res = await api.post("/shop/order", { items });
      return res.data as { message: string; order: Order };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Order failed");
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "shop/myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/shop/my-orders");
      return res.data.orders as Order[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch orders",
      );
    }
  },
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload as {
        product: Product;
        quantity: number;
      };
      const existing = state.cart.find((c) => c.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({ product, quantity });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((c) => c.product.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    clearShopMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.successMessage = action.payload.message;
        state.myOrders.unshift(action.payload.order);
        state.cart = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.myOrders = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, clearCart, clearShopMessages } =
  shopSlice.actions;
export default shopSlice.reducer;
