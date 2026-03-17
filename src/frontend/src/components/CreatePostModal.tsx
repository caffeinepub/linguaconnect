import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { PostTypeEnum } from "../backend";
import { LANGUAGES } from "../contexts/LanguageContext";
import { useCreatePost } from "../hooks/useQueries";
import { AudioRecorder } from "./AudioRecorder";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: "text" | "audio";
}

export function CreatePostModal({
  open,
  onClose,
  defaultMode = "text",
}: CreatePostModalProps) {
  const [mode, setMode] = useState<"text" | "audio">(defaultMode);
  const [content, setContent] = useState("");
  const [lang, setLang] = useState("FR");
  const createPost = useCreatePost();

  const handleTextSubmit = async () => {
    if (!content.trim()) return;
    await createPost.mutateAsync({
      authorName: "Marie Dupont",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
      contentText: content,
      translationText: `${content} (Traduction simulée)`,
      originalLanguage: lang,
      postType: PostTypeEnum.text,
      audioDuration: null,
    });
    setContent("");
    onClose();
  };

  const handleAudioConfirm = async (transcript: string) => {
    await createPost.mutateAsync({
      authorName: "Marie Dupont",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
      contentText: transcript,
      translationText: `${transcript} (Traduction simulée)`,
      originalLanguage: lang,
      postType: PostTypeEnum.audio,
      audioDuration: 30n,
    });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl"
        style={{
          background: "#162236",
          border: "none",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        data-ocid="create.sheet"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="text-white text-lg font-bold">
            Nouvelle publication
          </SheetTitle>
        </SheetHeader>

        {/* Mode toggle */}
        <div
          className="flex rounded-xl p-1 mb-4"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {(["text", "audio"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: mode === m ? "#3D6FE0" : "transparent",
                color: mode === m ? "white" : "rgba(255,255,255,0.5)",
              }}
              data-ocid="create.tab"
            >
              {m === "text" ? "📝 Texte" : "🎤 Audio"}
            </button>
          ))}
        </div>

        {/* Language selector */}
        <div className="mb-4">
          <label
            htmlFor="lang-select"
            className="text-xs font-semibold mb-2 block"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Langue
          </label>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger
              id="lang-select"
              className="w-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
              }}
              data-ocid="create.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ background: "#1F2F45" }}>
              {LANGUAGES.map((l) => (
                <SelectItem
                  key={l.code}
                  value={l.code}
                  style={{ color: "white" }}
                >
                  {l.code} — {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {mode === "text" ? (
          <>
            <Textarea
              placeholder="Partagez quelque chose avec le monde..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mb-4 resize-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
              }}
              data-ocid="create.textarea"
            />
            <Button
              onClick={handleTextSubmit}
              disabled={!content.trim() || createPost.isPending}
              className="w-full"
              style={{ background: "#3D6FE0", color: "white" }}
              data-ocid="create.submit_button"
            >
              {createPost.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publication...
                </>
              ) : (
                "Publier"
              )}
            </Button>
          </>
        ) : (
          <AudioRecorder onConfirm={handleAudioConfirm} />
        )}
      </SheetContent>
    </Sheet>
  );
}
