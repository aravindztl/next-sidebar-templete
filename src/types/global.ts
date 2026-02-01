import type React from 'react';


export type UserRole = 'admin';



export type PrivilegeKey =
  | 'can_view_staff_privileges'
  | 'can_create_staff_privileges'
  | 'can_edit_staff_privileges'
  | 'can_delete_staff_privileges'

  | 'can_view_users'
  | 'can_create_users'
  | 'can_edit_users'
  | 'can_delete_users'

  | 'can_view_tournaments'
  | 'can_create_tournaments'
  | 'can_edit_tournaments'
  | 'can_delete_tournaments'

  | 'can_view_tournament_settings'
  | 'can_edit_tournament_settings'

  | 'can_view_tracks'
  | 'can_create_tracks'
  | 'can_edit_tracks'
  | 'can_delete_tracks'

  | 'can_view_practice_slots'
  | 'can_create_practice_slots'
  | 'can_edit_practice_slots'
  | 'can_delete_practice_slots'

  | 'can_view_practice_slot_templates'
  | 'can_create_practice_slot_templates'
  | 'can_edit_practice_slot_templates'
  | 'can_delete_practice_slot_templates'

  | 'can_view_practice_booking'

  | 'can_view_transactions'

  | 'can_view_promotions'
  | 'can_create_promotions'
  | 'can_edit_promotions'
  | 'can_delete_promotions'

  | 'can_view_push_notifications'
  | 'can_create_push_notifications'
  | 'can_edit_push_notifications'
  | 'can_delete_push_notifications'

  | 'can_view_locations'
  | 'can_create_locations'
  | 'can_edit_locations'
  | 'can_delete_locations'

  | 'can_view_facilities'
  | 'can_create_facilities'
  | 'can_edit_facilities'
  | 'can_delete_facilities'

  | 'can_view_settings'

  | 'can_view_support'
  | 'can_edit_support'

  | 'can_view_terms_and_conditions'
  | 'can_edit_terms_and_conditions'

  | 'can_view_privacy_policy'
  | 'can_edit_privacy_policy'

  | 'can_view_wallet_settings'
  | 'can_edit_wallet_settings'

  | 'can_edit_about'
  | 'can_view_about'

  | 'can_view_refund_policy'
  | 'can_edit_refund_policy'
  


export type Privileges = {
  [K in PrivilegeKey]?: boolean;
};


interface BaseMenuItem {
  id: string;
  name: string;
  path: string;
  requiredPrivilege?: PrivilegeKey;
}

export interface MenuItem extends BaseMenuItem {
  icon?: React.ReactNode;
  submenu?: MenuItem[];
}


export interface User {
  name: string;
  role: UserRole;
  privileges?: Privileges;
}


export interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error" | "star";
  read: boolean;
  timeAgo: string;
  link?: string;
}