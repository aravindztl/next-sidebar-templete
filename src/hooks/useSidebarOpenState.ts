"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sidebarKeys } from "@/lib/queryKeys";

export const useSidebarOpenState = () => {
  const queryClient = useQueryClient();

  const { data: isMobileMenuOpen = false } = useQuery({
    queryKey: sidebarKeys.mobileMenu,
    queryFn: () => false,
    staleTime: Infinity,
  });

  const setIsMobileMenuOpen = (value: boolean) => {
    queryClient.setQueryData(sidebarKeys.mobileMenu, value);
  };

  const toggleMobileMenu = () => {
    queryClient.setQueryData(
      sidebarKeys.mobileMenu,
      (prev: boolean = false) => !prev,
    );
  };

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
  };
};
