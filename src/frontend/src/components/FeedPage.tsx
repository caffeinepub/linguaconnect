import { Loader2, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { Post } from "../backend";
import {
  PostTypeEnum,
  useAddSamplePosts,
  useAllPosts,
  useLikePost,
} from "../hooks/useQueries";
import { PostCard } from "./PostCard";

type FilterTab = "tous" | "audios" | "textes";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "audios", label: "Audios" },
  { id: "textes", label: "Textes" },
];

export function FeedPage() {
  const [filter, setFilter] = useState<FilterTab>("tous");
  const { data: posts, isLoading, refetch } = useAllPosts();
  const addSample = useAddSamplePosts();
  const likeMutation = useLikePost();

  const initFeed = useCallback(async () => {
    await addSample.mutateAsync(undefined);
    refetch();
  }, [addSample, refetch]);

  useEffect(() => {
    initFeed();
  }, [initFeed]);

  const filtered: Post[] = (posts ?? []).filter((p) => {
    if (filter === "tous") return true;
    const isAudio =
      p.postType === PostTypeEnum.audio ||
      (p.postType as unknown as { audio: null })?.audio !== undefined;
    if (filter === "audios") return isAudio;
    return !isAudio;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Filter tabs */}
      <div
        className="sticky top-[57px] z-40 px-4 py-3 flex gap-2"
        style={{
          background: "linear-gradient(180deg, #162236 0%, #0F1C2B 100%)",
          borderBottom: "1px solid rgba(61,111,224,0.15)",
        }}
        data-ocid="feed.section"
      >
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all"
            style={
              filter === tab.id
                ? { background: "#3D6FE0", color: "white" }
                : {
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                  }
            }
            data-ocid="feed.tab"
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => refetch()}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
            data-ocid="feed.button"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable feed */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background: "linear-gradient(180deg, #0F1C2B 0%, #162236 100%)",
        }}
      >
        {isLoading || addSample.isPending ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="feed.loading_state"
          >
            <Loader2
              size={32}
              className="animate-spin"
              style={{ color: "#3D6FE0" }}
            />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Chargement du fil...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3 text-center px-8"
            data-ocid="feed.empty_state"
          >
            <span className="text-4xl">🎙️</span>
            <p className="font-semibold text-white">
              Aucun post pour l&apos;instant
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Soyez le premier à partager votre voix !
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="flex flex-col gap-3 p-4">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.postId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <PostCard
                    post={post}
                    onLike={(id) => likeMutation.mutate(id)}
                    index={i + 1}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
