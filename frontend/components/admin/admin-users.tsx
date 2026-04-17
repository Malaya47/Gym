"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAdminUsers } from "@/store/slices/adminSlice";
import { Users } from "lucide-react";

export function AdminUsers() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((s) => s.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const genderLabel = (g?: string | null) => {
    if (!g) return "—";
    return g.charAt(0) + g.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users size={20} className="text-blue-400" />
          All Customers ({users.length})
        </h2>
      </div>

      {loading ? (
        <div className="text-white/40 text-sm">Loading...</div>
      ) : users.length === 0 ? (
        <div className="bg-[#111] border border-white/5 rounded-xl p-10 text-center text-white/30">
          No customers registered yet.
        </div>
      ) : (
        <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-white/40">
                  <th className="text-left px-4 py-3 font-medium">#</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Phone</th>
                  <th className="text-left px-4 py-3 font-medium">Age</th>
                  <th className="text-left px-4 py-3 font-medium">Gender</th>
                  <th className="text-left px-4 py-3 font-medium">Goal</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Memberships
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Orders</th>
                  <th className="text-left px-4 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 text-white/30">{user.id}</td>
                    <td className="px-4 py-3 text-white font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-white/60">{user.email}</td>
                    <td className="px-4 py-3 text-white/60">
                      {user.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-white/60">
                      {user.age ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-white/60">
                      {genderLabel(user.gender)}
                    </td>
                    <td className="px-4 py-3 text-white/60 max-w-[120px] truncate">
                      {user.goal || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2 py-0.5 rounded-full">
                        {user._count.memberships}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs px-2 py-0.5 rounded-full">
                        {user._count.orders}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
