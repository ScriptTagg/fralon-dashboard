"use client";
import { useAuthContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const { user, profile, isAuthenticated, isInitialized } = useAuthContext();
  if (!user || !profile) {
    throw new Error("useAuthUser must be used inside protected routes");
  }
  return { user, profile, isAuthenticated, isInitialized };
};
// readonly state
