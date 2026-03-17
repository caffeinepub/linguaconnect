import { motion } from "motion/react";
import { useState } from "react";

interface Notif {
  id: number;
  type: "like" | "comment" | "audio";
  text: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFS: Notif[] = [
  {
    id: 1,
    type: "like",
    text: "Carlos Rivera a aimé votre publication",
    time: "2min",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    text: "Yuki Tanaka a commenté : 'Très beau message !'",
    time: "5min",
    read: false,
  },
  {
    id: 3,
    type: "audio",
    text: "Amara Diallo a répondu en audio à votre post",
    time: "12min",
    read: false,
  },
  {
    id: 4,
    type: "like",
    text: "Liu Wei a aimé votre publication",
    time: "1h",
    read: true,
  },
  {
    id: 5,
    type: "comment",
    text: "Hans Müller a commenté : 'Bonjour depuis Berlin!'",
    time: "2h",
    read: true,
  },
  {
    id: 6,
    type: "audio",
    text: "Carlos Rivera vous a répondu en audio",
    time: "3h",
    read: true,
  },
  {
    id: 7,
    type: "like",
    text: "5 personnes ont aimé votre dernier audio",
    time: "5h",
    read: true,
  },
];

const ICONS = { like: "❤️", comment: "💬", audio: "🎤" };

export function NotificationsPage() {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "#0F1C2B" }}
      data-ocid="notifications.section"
    >
      {/* Header bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 py-3"
        style={{
          background: "#0F1C2B",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h1 className="text-base font-bold text-white">
          Notifications
          {unreadCount > 0 && (
            <span
              className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-semibold"
              style={{ background: "#3D6FE0", color: "white" }}
            >
              {unreadCount}
            </span>
          )}
        </h1>
        <button
          type="button"
          onClick={markAllRead}
          className="text-xs font-semibold"
          style={{ color: "#3D6FE0" }}
          data-ocid="notifications.button"
        >
          Tout marquer comme lu
        </button>
      </div>

      {/* List */}
      <div
        className="flex flex-col divide-y"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        {notifs.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() =>
              setNotifs((prev) =>
                prev.map((p) => (p.id === n.id ? { ...p, read: true } : p)),
              )
            }
            className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
            style={{
              background: n.read ? "transparent" : "rgba(61,111,224,0.07)",
            }}
            data-ocid={`notifications.item.${i + 1}`}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              {ICONS[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm"
                style={{ color: n.read ? "rgba(255,255,255,0.6)" : "white" }}
              >
                {n.text}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {n.time}
              </p>
            </div>
            {!n.read && (
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: "#3D6FE0" }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
