// =============================================================================
// NEXUS — Notification Center & Toast Alert System Store (Zustand)
// =============================================================================

import { create } from 'zustand';
import type { ActivityEvent } from '@/types/financial';
import { getTimelineEventsForBusiness } from '@/data/mock-data';

interface NotificationState {
  notifications: ActivityEvent[];
  unreadCount: number;
  addNotification: (notification: Omit<ActivityEvent, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

const initialNotifications = getTimelineEventsForBusiness('mfg_pinnacle');

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter((n) => !n.isRead).length,

  addNotification: (n) =>
    set((state) => {
      const newNotification: ActivityEvent = {
        ...n,
        id: `notif_${Date.now()}`,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      const updated = [newNotification, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: state.unreadCount + 1,
      };
    }),

  markAsRead: (id) =>
    set((state) => {
      let marked = false;
      const updated = state.notifications.map((n) => {
        if (n.id === id && !n.isRead) {
          marked = true;
          return { ...n, isRead: true };
        }
        return n;
      });
      return {
        notifications: updated,
        unreadCount: marked ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  clearNotification: (id) =>
    set((state) => {
      const target = state.notifications.find((n) => n.id === id);
      const isUnread = target ? !target.isRead : false;
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: isUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      };
    }),
}));
