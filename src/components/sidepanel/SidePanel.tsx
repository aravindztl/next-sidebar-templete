"use client";

import { motion, AnimatePresence } from "motion/react";
import { SidePanelContent } from "./SidePanelContent";
import { useSidebarController } from "@/hooks/useSidebarController";
import { useSidebarMenu } from "@/hooks/useSidebarMenu";
import { UserRole } from "@/types/global";

interface SidePanelProps {
  role: UserRole;
}

export default function SidePanel({ role }: SidePanelProps) {
  const {
    isMobile,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSidePanelExpanded,
    setIsSidePanelExpanded,
    isPinned,
    pathname,
  } = useSidebarController();

  const {
    menuItems,
    openMenus,
    activeSubmenuId,
    handleParentMenuClick,
    handleNavigation,
    isItemActive,
  } = useSidebarMenu(role);

  return (
    <AnimatePresence>
      {isMobile ? (
        isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden max-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed left-0 top-0 z-50 h-screen w-[85vw] bg-primary text-white flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
            >
              <SidePanelContent
                pathname={pathname}
                menuItems={menuItems}
                isExpanded={true}
                openMenus={openMenus}
  
                activeSubmenuId={activeSubmenuId}
                handleParentMenuClick={handleParentMenuClick}
                handleNavigation={handleNavigation}
                isItemActive={isItemActive}
                isMobile
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </motion.div>
          </>
        )
      ) : (
        <motion.div
          className="bg-primary text-white flex-col h-screen sticky top-0 hidden md:flex"
          animate={{ width: isSidePanelExpanded ? 240 : 82 }}
          onMouseEnter={() => setIsSidePanelExpanded(true)}
          onMouseLeave={() => {
            if (!isPinned) setIsSidePanelExpanded(false);
          }}
        >
          <SidePanelContent
            pathname={pathname}
            menuItems={menuItems}
            isExpanded={isSidePanelExpanded}
            openMenus={openMenus}
            activeSubmenuId={activeSubmenuId}
            handleParentMenuClick={handleParentMenuClick}
            handleNavigation={handleNavigation}
            isItemActive={isItemActive}
            isMobile={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
