import { MenuItem, Privileges } from "@/types/types";

export const segmentToSubmenuId: Record<string, string> = {
  "all-user": "all-users",
  "active-user": "active-users",
  "inactive-user": "inactive-users",
  "all-booking": "all-bookings",
  "upcoming-booking": "upcoming-bookings",
  "completed-booking": "completed-bookings",
  slot: "Slots", 
  slots: "Slots",
};

export const hasPrivilege = (
  privileges: Privileges | undefined,
  perm: keyof Privileges | undefined
): boolean => {
  if (!perm) return true;
  return !!privileges?.[perm];
};

export const filterMenuByPrivileges = (
  items: MenuItem[],
  privileges: Privileges | undefined
): MenuItem[] => {
  return items
    .filter((item) => hasPrivilege(privileges, item.requiredPrivilege))
    .map((item) => {
      if (item.submenu) {
        const filteredSubmenu = filterMenuByPrivileges(
          item.submenu,
          privileges
        );
        return filteredSubmenu.length > 0
          ? { ...item, submenu: filteredSubmenu }
          : null;
      }
      return item;
    })
    .filter((item): item is MenuItem => item !== null);
};
