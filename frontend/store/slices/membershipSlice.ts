import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface MembershipPlan {
  id: number;
  name: string;
  duration: string;
  price: number;
  currency: string;
  features: string[];
  category: string;
}

export interface MembershipPurchase {
  id: number;
  planId: number;
  plan: MembershipPlan;
  status: "PENDING" | "APPROVED" | "REJECTED";
  notes?: string;
  createdAt: string;
}

interface MembershipState {
  plans: MembershipPlan[];
  myPurchases: MembershipPurchase[];
  loading: boolean;
  purchaseLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: MembershipState = {
  plans: [],
  myPurchases: [],
  loading: false,
  purchaseLoading: false,
  error: null,
  successMessage: null,
};

export const fetchPlans = createAsyncThunk(
  "membership/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/membership/plans");
      return res.data.plans as MembershipPlan[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch plans",
      );
    }
  },
);

export const purchaseMembership = createAsyncThunk(
  "membership/purchase",
  async (
    data:
      | number
      | {
          planId: number;
          registrationFee?: number;
          totalAmount?: number;
          signatureDataUrl?: string;
          registrationDetails?: Record<string, unknown>;
        },
    { rejectWithValue },
  ) => {
    try {
      const body = typeof data === "number" ? { planId: data } : data;
      const res = await api.post("/membership/purchase", body);
      return res.data as { message: string; purchase: MembershipPurchase };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Purchase failed");
    }
  },
);

export const fetchMyPurchases = createAsyncThunk(
  "membership/myPurchases",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/membership/my-purchases");
      return res.data.purchases as MembershipPurchase[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch purchases",
      );
    }
  },
);

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    clearMembershipMessages(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(purchaseMembership.pending, (state) => {
        state.purchaseLoading = true;
        state.error = null;
      })
      .addCase(purchaseMembership.fulfilled, (state, action) => {
        state.purchaseLoading = false;
        state.successMessage = action.payload.message;
        state.myPurchases.unshift(action.payload.purchase);
      })
      .addCase(purchaseMembership.rejected, (state, action) => {
        state.purchaseLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(fetchMyPurchases.fulfilled, (state, action) => {
      state.myPurchases = action.payload;
    });
  },
});

export const { clearMembershipMessages } = membershipSlice.actions;
export default membershipSlice.reducer;
