"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { menuConfig } from "@/components/sidepanel/menuLists";
import {
  filterMenuByPrivileges,
  segmentToSubmenuId,
} from "@/components/sidepanel/helper";
import { MenuItem, UserRole } from "@/types/global";

export const useSidebarMenu = (role: UserRole) => {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const user = useUserStore((s) => s.user);

  const baseMenuItems = useMemo(() => {
    return menuConfig[role] || menuConfig.admin;
  }, [role]);

  const menuItems = useMemo(() => {
    return filterMenuByPrivileges(baseMenuItems, user?.privileges);
  }, [baseMenuItems, user?.privileges]);

  const { activeParentId, activeSubmenuId } = useMemo(() => {
    if (!pathname.startsWith("/admin/")) {
      return { activeParentId: null, activeSubmenuId: null };
    }

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 3) {
      return { activeParentId: null, activeSubmenuId: null };
    }

    const parentPathSegment = segments[1];
    const fullParentPath = `/admin/${parentPathSegment}`;

    const parentItem: MenuItem = menuItems.find(
      (item) => item.path === fullParentPath,
    );

    if (!parentItem?.submenu) {
      return {
        activeParentId: parentItem?.id || null,
        activeSubmenuId: null,
      };
    }

    const exactMatch = parentItem.submenu.find((sub) => sub.path === pathname);

    if (exactMatch) {
      return {
        activeParentId: parentItem.id,
        activeSubmenuId: exactMatch.id,
      };
    }

    const submenuSegment = segments[2];
    let key = submenuSegment;

    if (!(key in segmentToSubmenuId)) {
      key = submenuSegment.endsWith("s")
        ? submenuSegment.slice(0, -1)
        : submenuSegment;
    }

    if (key in segmentToSubmenuId) {
      const mappedId = segmentToSubmenuId[key];
      return {
        activeParentId: parentItem.id,
        activeSubmenuId: mappedId,
      };
    }

    return {
      activeParentId: parentItem.id,
      activeSubmenuId: null,
    };
  }, [pathname, menuItems]);

  useEffect(() => {
    if (activeParentId) {
      setOpenMenus((prev) => ({
        ...prev,
        [activeParentId]: true,
      }));
    }
  }, [activeParentId]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleParentMenuClick = (item: MenuItem) => {
    if (item.submenu && item.submenu.length > 0) {
      const isOpening = !openMenus[item.id];

      setOpenMenus((prev) => ({
        ...prev,
        [item.id]: isOpening,
      }));

      if (isOpening && item.submenu[0]?.path) {
        handleNavigation(item.submenu[0].path);
      }
    } else if (item.path) {
      handleNavigation(item.path);
    }
  };

  const isItemActive = (item: MenuItem) => {
    if (item.id === activeParentId) return true;
    if (item.path === pathname) return true;

    return item.submenu?.some((sub) => sub.path === pathname);
  };

  return {
    menuItems,
    openMenus,
    activeParentId,
    activeSubmenuId,
    handleParentMenuClick,
    handleNavigation,
    isItemActive,
  };
};
