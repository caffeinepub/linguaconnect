import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Mic,
  MoreVertical,
  Pause,
  Play,
  RefreshCw,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Post } from "../backend";
import { PostTypeEnum } from "../backend";

function timeAgo(ts: bigint): string {
  const seconds = Math.floor((Date.now() - Number(ts) / 1_000_000) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}j`;
}

function formatDuration(secs: bigint): string {
  const s = Number(secs);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

const WAVE_HEIGHTS = [
  30, 45, 60, 80, 55, 70, 40, 85, 65, 50, 75, 90, 45, 60, 35, 80, 55, 70, 40,
  65, 85, 50, 75, 60, 45, 90, 35, 70, 55, 80, 40, 65, 75, 50, 60, 85, 45, 30,
  70, 55,
];

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onOpenComments: (postId: string) => void;
  onAudioReply?: () => void;
  index: number;
}

function isAudioPost(post: Post): boolean {
  return (
    post.postType === PostTypeEnum.audio ||
    (post.postType as unknown as { audio: null })?.audio !== undefined
  );
}

export function PostCard({
  post,
  onLike,
  onOpenComments,
  onAudioReply,
  index,
}: PostCardProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 0;
        }
        return p + 0.5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [playing]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    if (!liked) onLike(post.postId);
  };

  const isAudio = isAudioPost(post);
  const duration = post.audioDuration ?? 0n;
  const elapsed = BigInt(Math.floor((Number(duration) * progress) / 100));

  const words = post.contentText.split(" ");
  const highlight1 = Math.floor(words.length * 0.2);
  const highlight2 = Math.floor(words.length * 0.5);

  const displayText = showOriginal
    ? post.contentText
    : post.translationText || post.contentText;

  return (
    <article
      className="w-full bg-white rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
      data-ocid={`feed.item.${index}`}
    >
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.avatarUrl} alt={post.authorName} />
          <AvatarFallback
            className="text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #3D6FE0, #233B57)" }}
          >
            {post.authorName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[15px] font-semibold"
              style={{ color: "#111827" }}
            >
              {post.authorName}
            </span>
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
              style={{ background: "rgba(61,111,224,0.1)", color: "#3D6FE0" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#3D6FE0" }}
              />
              {post.originalLanguage}
            </span>
          </div>
          <span className="text-[12px]" style={{ color: "#6B7280" }}>
            {timeAgo(post.createdTimestamp)}
          </span>
        </div>
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          style={{ color: "#6B7280" }}
          data-ocid={`feed.open_modal_button.${index}`}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {isAudio ? (
        <div
          className="mx-4 mb-3 rounded-2xl overflow-hidden relative"
          style={{ minHeight: 200 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #8B5A2B 0%, #C9713A 45%, #8B3A0A 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.45)" }}
          />

          <div className="relative z-10 p-4">
            <div className="mb-2">
              <p className="text-white font-bold text-base leading-relaxed">
                {words.map((word, wi) => {
                  if (wi === highlight1) {
                    return (
                      <span key={`w-${post.postId}-${wi}`}>
                        <span
                          className="px-2 py-0.5 rounded-md text-white font-bold mx-0.5"
                          style={{ background: "#3D6FE0" }}
                        >
                          {word}
                        </span>{" "}
                      </span>
                    );
                  }
                  if (wi === highlight2) {
                    return (
                      <span key={`w-${post.postId}-${wi}`}>
                        <span
                          className="px-2 py-0.5 rounded-md font-bold mx-0.5"
                          style={{ background: "#C9A24A", color: "#111827" }}
                        >
                          {word}
                        </span>{" "}
                      </span>
                    );
                  }
                  return <span key={`w-${post.postId}-${wi}`}>{word} </span>;
                })}
              </p>
            </div>

            <p className="text-white/80 text-sm font-medium mb-4">
              {post.translationText}
            </p>

            {/* Waveform */}
            <div className="flex items-end gap-[2px] h-10 mb-3">
              {WAVE_HEIGHTS.map((h, wi) => {
                const filled = (wi / WAVE_HEIGHTS.length) * 100 < progress;
                return (
                  <div
                    key={`bar-${post.postId}-${wi}`}
                    className="wave-bar flex-shrink-0"
                    style={{
                      height: `${h}%`,
                      background: filled
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.35)",
                      animationDelay: `${(wi % 7) * 0.12}s`,
                      animationPlayState: playing ? "running" : "paused",
                      width: 3,
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </div>

            {/* Scrubber */}
            <div className="mb-3">
              <div
                className="w-full h-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.25)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progress}%`, background: "white" }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-white/70 text-[11px]">
                  {formatDuration(elapsed)}
                </span>
                <span className="text-white/70 text-[11px]">
                  {duration > 0n ? formatDuration(duration) : "0:30"}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <SkipBack size={16} className="text-white" />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all active:scale-95"
                style={{ background: "white" }}
                data-ocid={`feed.toggle.${index}`}
              >
                {playing ? (
                  <Pause size={20} style={{ color: "#1F2F45" }} />
                ) : (
                  <Play size={20} style={{ color: "#1F2F45", marginLeft: 2 }} />
                )}
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <SkipForward size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mx-4 mb-3 p-4 rounded-2xl"
          style={{ background: "#F9FAFB" }}
        >
          <p
            className="text-[15px] font-medium mb-2"
            style={{ color: "#111827" }}
          >
            {displayText}
          </p>
        </div>
      )}

      {/* Actions row */}
      <div className="flex items-center justify-between px-4 pb-3">
        <button
          type="button"
          onClick={() => setShowOriginal((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors hover:bg-gray-50"
          style={{
            border: "1px solid #E5E7EB",
            color: showOriginal ? "#3D6FE0" : "#374151",
          }}
          data-ocid={`feed.toggle.${index}`}
        >
          <RefreshCw size={12} />
          {showOriginal ? "Voir traduction" : "Voir original"}
        </button>
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            onClick={handleLike}
            whileTap={{ scale: 1.3 }}
            className="flex items-center gap-1.5 transition-transform"
            style={{ color: liked ? "#ef4444" : "#6B7280" }}
            data-ocid={`feed.toggle.${index}`}
          >
            <Heart
              size={18}
              fill={liked ? "#ef4444" : "none"}
              className="transition-colors"
            />
            <span className="text-[13px] font-medium">
              {(post.likesCount + (liked ? 1n : 0n)).toString()}
            </span>
          </motion.button>
          <button
            type="button"
            onClick={() => onOpenComments(post.postId)}
            className="flex items-center gap-1.5"
            style={{ color: "#6B7280" }}
            data-ocid={`feed.button.${index}`}
          >
            <MessageCircle size={18} />
            <span className="text-[13px] font-medium">
              {post.commentsCount.toString()}
            </span>
          </button>
        </div>
      </div>

      {isAudio && (
        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={onAudioReply}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: "#233B57" }}
            data-ocid={`feed.secondary_button.${index}`}
          >
            <Mic size={15} />
            Répondre en audio
          </button>
        </div>
      )}
    </article>
  );
}
