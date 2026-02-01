"use client";
import { useSidebarOpenState } from "@/hooks/useSidebarOpenState";
import { Button } from "../ui/button";

const ToggleMenuButton = () => {
  const { toggleMobileMenu } = useSidebarOpenState();

  return <Button onClick={toggleMobileMenu}>Open Menu</Button>;
};

export default ToggleMenuButton;
