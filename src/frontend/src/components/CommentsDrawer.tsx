import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useAddComment, useComments } from "../hooks/useQueries";

function timeAgo(ts: bigint): string {
  const seconds = Math.floor((Date.now() - Number(ts) / 1_000_000) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}min`;
  return `${Math.floor(mins / 60)}h`;
}

interface CommentsDrawerProps {
  postId: string | null;
  onClose: () => void;
}

export function CommentsDrawer({ postId, onClose }: CommentsDrawerProps) {
  const [author, setAuthor] = useState("Marie Dupont");
  const [text, setText] = useState("");
  const { data: comments, isLoading } = useComments(postId);
  const addComment = useAddComment();

  const handleSend = async () => {
    if (!postId || !text.trim()) return;
    await addComment.mutateAsync({
      postId,
      authorName: author,
      content: text.trim(),
    });
    setText("");
  };

  return (
    <Sheet open={!!postId} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl flex flex-col"
        style={{ background: "#162236", border: "none", maxHeight: "80vh" }}
        data-ocid="comments.sheet"
      >
        <SheetHeader className="mb-3">
          <SheetTitle className="text-white">Commentaires</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mb-3 space-y-3 pr-1">
          {isLoading ? (
            <div
              className="flex justify-center py-8"
              data-ocid="comments.loading_state"
            >
              <Loader2 className="animate-spin" style={{ color: "#3D6FE0" }} />
            </div>
          ) : !comments || comments.length === 0 ? (
            <div
              className="text-center py-8"
              style={{ color: "rgba(255,255,255,0.4)" }}
              data-ocid="comments.empty_state"
            >
              <p>Aucun commentaire. Soyez le premier !</p>
            </div>
          ) : (
            comments.map((c, i) => (
              <div
                key={`${c.authorName}-${i}`}
                className="flex gap-3"
                data-ocid={`comments.item.${i + 1}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback
                    style={{
                      background: "linear-gradient(135deg, #3D6FE0, #233B57)",
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {c.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className="flex-1 p-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-white">
                      {c.authorName}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {timeAgo(c.timestamp)}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {c.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div
          className="flex gap-2 pt-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Input
            placeholder="Auteur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-28 text-sm"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
            }}
          />
          <Input
            placeholder="Écrire un commentaire..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 text-sm"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
            }}
            data-ocid="comments.input"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!text.trim() || addComment.isPending}
            style={{ background: "#3D6FE0", color: "white" }}
            data-ocid="comments.submit_button"
          >
            {addComment.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
