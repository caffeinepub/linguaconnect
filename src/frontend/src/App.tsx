import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { BottomNav } from "./components/BottomNav";
import { CreatePostModal } from "./components/CreatePostModal";
import { ExplorerPage } from "./components/ExplorerPage";
import { FeedPage } from "./components/FeedPage";
import { FriendsPage } from "./components/FriendsPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";
import { VideoCreateSheet } from "./components/VideoCreateSheet";
import { LanguageProvider } from "./contexts/LanguageContext";

type Page =
  | "feed"
  | "explorer"
  | "create"
  | "notifications"
  | "profile"
  | "settings"
  | "amis"
  | "video";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  const [page, setPage] = useState<Page>("feed");
  const [showCreate, setShowCreate] = useState(false);
  const [showVideoCreate, setShowVideoCreate] = useState(false);

  const handleNavigate = (p: string) => {
    if (p === "create") {
      setShowCreate(true);
    } else if (p === "video") {
      setShowVideoCreate(true);
    } else {
      setPage(p as Page);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "feed":
        return <FeedPage />;
      case "explorer":
        return <ExplorerPage />;
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      case "amis":
        return <FriendsPage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div
          className="min-h-screen flex items-start justify-center"
          style={{ background: "#060E17" }}
        >
          {/* Phone frame */}
          <div
            className="relative flex flex-col w-full max-w-[430px] min-h-screen overflow-hidden"
            style={{ background: "#0F1C2B" }}
          >
            <AppHeader onNavigate={handleNavigate} />
            <main className="flex flex-col flex-1 overflow-hidden">
              {renderPage()}
            </main>
            <BottomNav activePage={page} onNavigate={handleNavigate} />

            {/* Footer */}
            <footer
              className="py-2 text-center text-[10px]"
              style={{ background: "#0A1520", color: "rgba(255,255,255,0.3)" }}
            >
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                className="underline hover:text-white/60 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                caffeine.ai
              </a>
            </footer>
          </div>
        </div>

        <CreatePostModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
        />
        <VideoCreateSheet
          open={showVideoCreate}
          onClose={() => setShowVideoCreate(false)}
        />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
