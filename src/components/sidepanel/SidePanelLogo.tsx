import Image from "next/image";
import { motion } from "motion/react";
import { CONSTANTS } from "@/utils/constant";

export function SidePanelLogo({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className="p-7">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 h-10">
          <motion.div
            initial={false}
            animate={{
              width: isExpanded ? 0 : 62,
              opacity: isExpanded ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex items-center justify-center"
          >
            <Image
              src="/static/Logo_Icon.webp"
              alt={CONSTANTS.APP_NAME}
              width={62}
              height={62}
            />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              width: isExpanded ? 136 : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex items-center"
          >
            <Image
              src="/static/Logo.webp"
              alt={CONSTANTS.APP_NAME}
              width={136}
              height={32}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
