"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSidebarOpenState } from "./useSidebarOpenState";

export const useSidebarController = () => {
  const pathname = usePathname();


  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
    isSidePanelExpanded,
    toggleSidePanel,
    setIsSidePanelExpanded,
    isPinned,
    isMobile,
    setIsMobile
  } = useSidebarOpenState();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return {
    pathname,
    isSidePanelExpanded,
    setIsSidePanelExpanded,

    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,

    isMobile,
    toggleSidePanel,
    isPinned
  };
};
