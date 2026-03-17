import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const TRENDS = [
  "#Bonjour",
  "#Travel",
  "#Music",
  "#Food",
  "#Tech",
  "#Sport",
  "#Cinema",
  "#Mode",
];

const SUGGESTED_USERS = [
  {
    name: "Carlos Rivera",
    username: "@carlos_r",
    lang: "ES",
    avatar: "https://i.pravatar.cc/150?img=12",
    followers: "2.4k",
  },
  {
    name: "Yuki Tanaka",
    username: "@yuki_t",
    lang: "JA",
    avatar: "https://i.pravatar.cc/150?img=25",
    followers: "1.8k",
  },
  {
    name: "Amara Diallo",
    username: "@amara_d",
    lang: "FR",
    avatar: "https://i.pravatar.cc/150?img=44",
    followers: "987",
  },
  {
    name: "Liu Wei",
    username: "@liu_wei",
    lang: "ZH",
    avatar: "https://i.pravatar.cc/150?img=68",
    followers: "3.1k",
  },
  {
    name: "Hans Müller",
    username: "@hans_m",
    lang: "DE",
    avatar: "https://i.pravatar.cc/150?img=55",
    followers: "542",
  },
];

export function ExplorerPage() {
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<Set<number>>(new Set());

  const toggleFollow = (i: number) =>
    setFollowing((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "#0F1C2B" }}
      data-ocid="explorer.section"
    >
      {/* Search bar */}
      <div
        className="px-4 pt-4 pb-3 sticky top-0 z-10"
        style={{ background: "#0F1C2B" }}
      >
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          />
          <Input
            placeholder="Rechercher des posts, personnes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
            }}
            data-ocid="explorer.search_input"
          />
        </div>
      </div>

      {/* Trends */}
      <section className="px-4 mb-5">
        <h2
          className="text-sm font-bold mb-3"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          🔥 Tendances
        </h2>
        <div className="flex flex-wrap gap-2">
          {TRENDS.map((trend) => (
            <button
              key={trend}
              type="button"
              className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "rgba(61,111,224,0.2)",
                color: "#3D6FE0",
                border: "1px solid rgba(61,111,224,0.3)",
              }}
              data-ocid="explorer.tab"
            >
              {trend}
            </button>
          ))}
        </div>
      </section>

      {/* Suggested users */}
      <section className="px-4 pb-6">
        <h2
          className="text-sm font-bold mb-3"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          👥 Personnes suggérées
        </h2>
        <div className="flex flex-col gap-3">
          {SUGGESTED_USERS.map((user, i) => (
            <div
              key={user.username}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              data-ocid={`explorer.item.${i + 1}`}
            >
              <Avatar className="w-11 h-11">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback
                  style={{ background: "#3D6FE0", color: "white" }}
                >
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {user.username}
                  </span>
                  <Badge
                    className="text-[10px] px-1.5 py-0"
                    style={{
                      background: "rgba(61,111,224,0.2)",
                      color: "#3D6FE0",
                      border: "none",
                    }}
                  >
                    {user.lang}
                  </Badge>
                </div>
                <p
                  className="text-[11px]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {user.followers} abonnés
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFollow(i)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: following.has(i)
                    ? "rgba(255,255,255,0.1)"
                    : "#3D6FE0",
                  color: following.has(i) ? "rgba(255,255,255,0.7)" : "white",
                }}
                data-ocid={`explorer.toggle.${i + 1}`}
              >
                {following.has(i) ? "Abonné" : "Suivre"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
