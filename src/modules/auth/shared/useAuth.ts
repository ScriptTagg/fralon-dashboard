"use client";
import { useAuthContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const { user, profile, isAuthenticated, isInitialized } = useAuthContext();

  return { user, profile, isAuthenticated, isInitialized };
};
// readonly state
