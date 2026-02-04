/**
 * Notifications Page
 * 
 * Displays all system notifications including package alerts,
 * delivery updates, and priority warnings.
 */
"use client";

import { useNotifications } from "@/lib/NotificationContext";
import { AlertCircle, CheckCircle2, Info, Trash2, Clock } from "lucide-react";

const typeConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  error: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  info: {
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
};

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
}

export default function NotificationsPage() {
  const { notifications, clearNotification, markAsRead, clearAllNotifications } = useNotifications();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="mt-1 text-sm text-slate-400">
            {notifications.length === 0 ? "No notifications" : `${notifications.length} notification${notifications.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition-all duration-200 text-sm font-medium"
          >
            Clear All
          </button>
        )}
      </header>

      {/* Notifications list */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-xl border border-orange-200/40 bg-gradient-to-br from-white to-orange-50/30 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100/50 mx-auto mb-4">
              <Clock className="h-8 w-8 text-orange-600/50" />
            </div>
            <p className="text-slate-600">No notifications yet</p>
            <p className="text-sm text-slate-500 mt-1">High-priority packages will appear here</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <div
                key={notification.id}
                className={`rounded-lg border transition-all duration-200 p-4 flex items-start gap-4 ${
                  notification.read
                    ? `${config.bgColor} ${config.borderColor} opacity-75`
                    : `${config.bgColor} ${config.borderColor} border-opacity-60`
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${config.bgColor}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${config.color} truncate`}>{notification.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-500">{formatTime(notification.timestamp)}</span>
                    {notification.priority && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        notification.priority === "high"
                          ? "bg-red-100/50 text-red-700"
                          : notification.priority === "medium"
                          ? "bg-amber-100/50 text-amber-700"
                          : "bg-green-100/50 text-green-700"
                      }`}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="px-3 py-1 text-xs font-medium bg-orange-500/20 text-orange-600 hover:bg-orange-500/30 rounded transition-all duration-200"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => clearNotification(notification.id)}
                    className="p-2 hover:bg-black/10 rounded-lg transition-all duration-200"
                    aria-label="Delete notification"
                  >
                    <Trash2 className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
