import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import type { Post } from "../backend";
import { useAllPosts } from "../hooks/useQueries";
import { PostCard } from "./PostCard";

const PROFILE = {
  name: "Marie Dupont",
  username: "@marie_d",
  bio: "Passionnée de langues et de voyages 🌍 | Parle FR, EN, ES",
  lang: "FR",
  avatar: "https://i.pravatar.cc/150?img=47",
  posts: 24,
  followers: "1.2k",
  following: "342",
  joined: "Janvier 2024",
};

export function ProfilePage() {
  const { data: allPosts } = useAllPosts();
  const myPosts: Post[] = (allPosts ?? []).filter((p) =>
    p.authorName.toLowerCase().includes("marie"),
  );

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "#0F1C2B" }}
      data-ocid="profile.section"
    >
      {/* Hero */}
      <div
        className="relative px-4 pt-8 pb-4"
        style={{
          background: "linear-gradient(180deg, #162236 0%, #0F1C2B 100%)",
        }}
      >
        {/* Cover gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background:
              "linear-gradient(135deg, rgba(61,111,224,0.3) 0%, rgba(35,59,87,0.4) 100%)",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          <Avatar
            className="w-20 h-20 mb-3"
            style={{ border: "3px solid #3D6FE0" }}
          >
            <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
            <AvatarFallback
              style={{ background: "#3D6FE0", color: "white", fontSize: 28 }}
            >
              M
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-white">{PROFILE.name}</h1>
          <p
            className="text-sm mb-1"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {PROFILE.username}
          </p>
          <Badge
            className="mb-2 text-xs"
            style={{
              background: "rgba(61,111,224,0.2)",
              color: "#3D6FE0",
              border: "1px solid rgba(61,111,224,0.3)",
            }}
          >
            🌐 {PROFILE.lang}
          </Badge>
          <p
            className="text-sm max-w-[260px]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {PROFILE.bio}
          </p>
        </div>

        {/* Stats */}
        <div
          className="flex justify-around mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { label: "Publications", value: myPosts.length || PROFILE.posts },
            { label: "Abonnés", value: PROFILE.followers },
            { label: "Abonnements", value: PROFILE.following },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="flex-1 flex flex-col">
        <TabsList
          className="mx-4 mt-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <TabsTrigger
            value="posts"
            className="flex-1 text-sm"
            data-ocid="profile.tab"
          >
            Publications
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="flex-1 text-sm"
            data-ocid="profile.tab"
          >
            À propos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="flex-1 p-4 space-y-3">
          {myPosts.length === 0 ? (
            <div
              className="text-center py-10"
              style={{ color: "rgba(255,255,255,0.4)" }}
              data-ocid="profile.empty_state"
            >
              <p>Aucune publication pour l'instant</p>
            </div>
          ) : (
            myPosts.map((post, i) => (
              <motion.div
                key={post.postId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <PostCard
                  post={post}
                  onLike={() => {}}
                  onOpenComments={() => {}}
                  index={i + 1}
                />
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="about" className="p-4">
          <div className="space-y-4">
            {[
              { label: "Bio", value: PROFILE.bio },
              {
                label: "Langue principale",
                value: `🌐 ${PROFILE.lang} — Français`,
              },
              { label: "Membre depuis", value: PROFILE.joined },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {item.label.toUpperCase()}
                </p>
                <p className="text-sm text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
