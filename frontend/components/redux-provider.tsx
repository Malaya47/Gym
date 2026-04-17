"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { fetchMe } from "@/store/slices/authSlice";
import { fetchAdminMe } from "@/store/slices/adminSlice";

function AppInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("gym_token")) {
      store.dispatch(fetchMe());
    }
    if (localStorage.getItem("gym_admin_token")) {
      store.dispatch(fetchAdminMe());
    }
  }, []);
  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInit />
      {children}
    </Provider>
  );
}
