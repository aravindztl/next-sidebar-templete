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

  const { data } = useQuery({
    queryKey: sidebarKeys.sidePanel,
    queryFn: () => {
      return {
        isSidePanelExpanded: false,
        isPinned: false,
      };
    },
    staleTime: Infinity,
  });

  const setIsSidePanelExpanded = (value: boolean) => {
    queryClient.setQueryData(
      sidebarKeys.sidePanel,
      (prev: { isSidePanelExpanded: boolean; isPinned: boolean }) => ({
        isSidePanelExpanded: value,
        isPinned: !!prev?.isPinned,
      }),
    );
  };

  const toggleSidePanel = () => {
    queryClient.setQueryData(
      sidebarKeys.sidePanel,
      (prev: { isSidePanelExpanded: boolean; isPinned: boolean }) => ({
        isSidePanelExpanded: !prev?.isSidePanelExpanded,
        isPinned: !prev?.isSidePanelExpanded,
      }),
    );
  };

    const { data:isMobile } = useQuery({
    queryKey: sidebarKeys.isMobile,
    queryFn: () => false,
    staleTime: Infinity,
  });


  const setIsMobile = (value: boolean) => {
    queryClient.setQueryData(sidebarKeys.isMobile, value);
  };


  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    isSidePanelExpanded: data?.isSidePanelExpanded,
    setIsSidePanelExpanded,
    toggleSidePanel,
    isPinned: data?.isPinned,
    isMobile,
    setIsMobile
  };
};
