"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSidebarOpenState } from "./useSidebarOpenState";

export const useSidebarController = () => {
  const pathname = usePathname();

  const [isSidePanelExpanded, setIsSidePanelExpanded] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,
  } = useSidebarOpenState();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname, isMobile, setIsMobileMenuOpen]);

  const toggleSidePanel = () => {
    const newExpanded = !isSidePanelExpanded;
    setIsSidePanelExpanded(newExpanded);
    setIsPinned(newExpanded);
  };

  return {
    pathname,
    isSidePanelExpanded,
    setIsSidePanelExpanded,
    isPinned,
    setIsPinned,

    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu,

    isMobile,
    toggleSidePanel,
  };
};
