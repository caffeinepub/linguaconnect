import { UserPlus } from "lucide-react";

const myFriends = [
  { id: 1, name: "Sofia M.", initials: "SM", color: "#3D6FE0", lang: "🇧🇷" },
  { id: 2, name: "Kenji T.", initials: "KT", color: "#7C3AED", lang: "🇯🇵" },
  { id: 3, name: "Amara D.", initials: "AD", color: "#059669", lang: "🇸🇳" },
  { id: 4, name: "Lucas V.", initials: "LV", color: "#DC2626", lang: "🇦🇷" },
  { id: 5, name: "Priya S.", initials: "PS", color: "#D97706", lang: "🇮🇳" },
  { id: 6, name: "Mei L.", initials: "ML", color: "#0891B2", lang: "🇨🇳" },
  { id: 7, name: "Omar K.", initials: "OK", color: "#BE185D", lang: "🇲🇦" },
  { id: 8, name: "Ingrid B.", initials: "IB", color: "#65A30D", lang: "🇸🇪" },
];

const suggestions = [
  {
    id: 1,
    name: "Yuki Tanaka",
    initials: "YT",
    color: "#3D6FE0",
    lang: "🇯🇵",
    mutual: 3,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    initials: "CR",
    color: "#DC2626",
    lang: "🇲🇽",
    mutual: 5,
  },
  {
    id: 3,
    name: "Fatou Ba",
    initials: "FB",
    color: "#059669",
    lang: "🇸🇳",
    mutual: 2,
  },
  {
    id: 4,
    name: "Anna Kowalski",
    initials: "AK",
    color: "#7C3AED",
    lang: "🇵🇱",
    mutual: 7,
  },
  {
    id: 5,
    name: "Hiroshi Naka",
    initials: "HN",
    color: "#D97706",
    lang: "🇯🇵",
    mutual: 1,
  },
  {
    id: 6,
    name: "Ines Martins",
    initials: "IM",
    color: "#BE185D",
    lang: "🇵🇹",
    mutual: 4,
  },
  {
    id: 7,
    name: "Dmitri Volkov",
    initials: "DV",
    color: "#0891B2",
    lang: "🇷🇺",
    mutual: 2,
  },
  {
    id: 8,
    name: "Leila Hasan",
    initials: "LH",
    color: "#65A30D",
    lang: "🇪🇬",
    mutual: 6,
  },
  {
    id: 9,
    name: "Samuel Osei",
    initials: "SO",
    color: "#F59E0B",
    lang: "🇬🇭",
    mutual: 3,
  },
  {
    id: 10,
    name: "Marta García",
    initials: "MG",
    color: "#EC4899",
    lang: "🇪🇸",
    mutual: 8,
  },
];

export function FriendsPage() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "#0F1C2B" }}
      data-ocid="amis.page"
    >
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3"
        style={{ borderBottom: "1px solid rgba(61,111,224,0.15)" }}
      >
        <h1 className="text-xl font-bold text-white">Amis</h1>
      </div>

      {/* Mes amis — horizontal scroll */}
      <div className="px-4 pt-4 pb-2">
        <h2
          className="text-sm font-semibold mb-3"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Mes amis · {myFriends.length}
        </h2>
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
          data-ocid="amis.list"
        >
          {myFriends.map((friend, i) => (
            <div
              key={friend.id}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
              data-ocid={`amis.item.${i + 1}`}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: friend.color }}
              >
                {friend.initials}
              </div>
              <div className="text-center">
                <p className="text-white text-[11px] font-medium whitespace-nowrap">
                  {friend.name}
                </p>
                <p className="text-[10px]">{friend.lang}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mx-4"
        style={{ height: 1, background: "rgba(61,111,224,0.15)" }}
      />

      {/* Suggestions — vertical scroll */}
      <div className="px-4 pt-4 pb-6">
        <h2
          className="text-sm font-semibold mb-3"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Suggestions
        </h2>
        <div className="flex flex-col gap-3" data-ocid="amis.table">
          {suggestions.map((s, i) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ background: "#1A2B3C" }}
              data-ocid={`amis.row.${i + 1}`}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: s.color }}
              >
                {s.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{s.name}</p>
                <p
                  className="text-[11px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {s.lang} · {s.mutual} ami{s.mutual > 1 ? "s" : ""} en commun
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity active:opacity-70"
                style={{ background: "#3D6FE0" }}
                data-ocid={`amis.button.${i + 1}`}
              >
                <UserPlus size={13} />
                Ajouter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
