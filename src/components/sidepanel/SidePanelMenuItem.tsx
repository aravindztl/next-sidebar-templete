import { motion } from "motion/react";
import { MenuItem } from "@/types/global";

type Props = {
  item: MenuItem;
  isActive: boolean | undefined;
  isExpanded: boolean;
  onClick: () => void;
};

export function SidePanelMenuItem({
  item,
  isActive,
  isExpanded,
  onClick,
}: Props) {
  return (
    <motion.div
      className={`relative flex items-center px-7 py-5 cursor-pointer transition-colors ${
        isActive
          ? "bg-white text-primary"
          : "text-white hover:bg-muted/20"
      }`}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <span className="text-2xl flex justify-center">{item.icon}</span>

      <motion.span
        initial={false}
        animate={{
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? "auto" : 0,
        }}
        transition={{ duration: 0.2 }}
        className="ml-3 grow overflow-hidden whitespace-nowrap"
      >
        {item.name}
      </motion.span>

      {isActive && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary" />
      )}
    </motion.div>
  );
}
