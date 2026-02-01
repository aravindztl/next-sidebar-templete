"use client";

import { usePathname } from "next/navigation";

export const useActiveMenu = () => {
  const pathname = usePathname();

  const getActiveMenuItem = (): string => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "dashboard";

    const mainSection = segments[1] || "dashboard";

    const directMatches: Record<string, string> = {
      dashboard: "dashboard",
      "user-management": "user-management",
      tournaments: "tournaments",
      "practice-booking": "practice-booking",
      tracks: "tracks",
      promotions: "promotions",
      transactions: "transactions",
      "staff-privileges": "staff-privileges",
      "push-notifications": "push-notifications",
      settings: "settings",
    };

    if (directMatches[mainSection]) {
      return directMatches[mainSection];
    }

    if (pathname.startsWith("/admin/user-management/")) {
      return "user-management";
    }

    if (pathname.startsWith("/admin/tournaments/")) {
      return "tournaments";
    }

    if (pathname.startsWith("/admin/practice-booking/")) {
      return "practice-booking";
    }

    return "dashboard";
  };

  return {
    activeItem: getActiveMenuItem(),
  };
};
