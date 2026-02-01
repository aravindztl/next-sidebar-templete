import { MenuItem } from "@/types/global";
import { SidePanelLogo } from "./SidePanelLogo";
import { SidePanelMenuItem } from "./SidePanelMenuItem";
import { SidePanelSubMenu } from "./SidePanelSubMenu";

type Props = {
  menuItems: MenuItem[];
  isExpanded: boolean;
  openMenus: Record<string, boolean>;
  activeSubmenuId: string | null;
  pathname: string;

  handleParentMenuClick: (item: MenuItem) => void;
  handleNavigation: (path: string) => void;
  isItemActive: (item: MenuItem) => boolean | undefined;

  isMobile: boolean;
  onClose?: () => void;
};

export function SidePanelContent({
  menuItems,
  isExpanded,
  openMenus,
  activeSubmenuId,
  pathname,
  handleParentMenuClick,
  handleNavigation,
  isItemActive,
  isMobile,
  onClose,
}: Props) {
  return (
    <>
      <SidePanelLogo isExpanded={isExpanded} />

      <div className="flex-1 pb-4 overflow-y-scroll hide-scrollbar">
        {menuItems.map((item) => {
          const isActive = isItemActive(item);
          const isMenuOpen = openMenus[item.id];

          return (
            <div key={item.id}>
              <SidePanelMenuItem
                item={item}
                isActive={isActive}
                isExpanded={isExpanded}
                onClick={() => handleParentMenuClick(item)}
              />

              {item.submenu && (
                <SidePanelSubMenu
                  submenu={item.submenu}
                  pathname={pathname}
                  activeSubmenuId={activeSubmenuId}
                  isExpanded={isExpanded}
                  isMenuOpen={isMenuOpen}
                  handleNavigation={handleNavigation}
                  isMobile={isMobile}
                  onClose={onClose}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
