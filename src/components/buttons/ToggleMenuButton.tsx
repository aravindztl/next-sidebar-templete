"use client";
import { useSidebarOpenState } from "@/hooks/useSidebarOpenState";
import { Button } from "../ui/button";

const ToggleMenuButton = () => {
  const { toggleMobileMenu, toggleSidePanel, isMobile } = useSidebarOpenState();

  return (
    <Button
      onClick={() => {
        if (isMobile) {
          toggleMobileMenu();
        } else {
          toggleSidePanel();
        }
      }}
    >
      Open Menu
    </Button>
  );
};

export default ToggleMenuButton;
