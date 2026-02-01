import { motion } from "motion/react";
import { MenuItem } from "@/types/global";

type Props = {
  submenu: MenuItem[];
  pathname: string;
  activeSubmenuId: string | null;
  isExpanded: boolean;
  isMenuOpen: boolean;
  handleNavigation: (path: string) => void;
  isMobile: boolean;
  onClose?: () => void;
};

export function SidePanelSubMenu({
  submenu,
  pathname,
  activeSubmenuId,
  isExpanded,
  isMenuOpen,
  handleNavigation,
  isMobile,
  onClose,
}: Props) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isExpanded && isMenuOpen ? "auto" : 0,
        opacity: isExpanded && isMenuOpen ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="ml-8 mt-1 space-y-1">
        {submenu.map((subItem) => (
          <motion.div
            key={subItem.id}
            className={`flex items-center p-2 cursor-pointer text-sm transition-colors rounded mr-2 ${
              subItem.path === pathname || subItem.id === activeSubmenuId
                ? "text-white font-medium"
                : "text-white/50 hover:text-white"
            }`}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (subItem.path) {
                handleNavigation(subItem.path);
                if (isMobile && onClose) onClose();
              }
            }}
          >
            <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
            <span>{subItem.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
