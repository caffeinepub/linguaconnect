import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppHeader } from "./components/AppHeader";
import { BottomNav } from "./components/BottomNav";
import { FeedPage } from "./components/FeedPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="min-h-screen flex items-start justify-center"
        style={{ background: "#060E17" }}
      >
        {/* Phone frame */}
        <div
          className="relative flex flex-col w-full max-w-[430px] min-h-screen overflow-hidden"
          style={{ background: "#0F1C2B" }}
        >
          <AppHeader />
          <main className="flex flex-col flex-1 overflow-hidden">
            <FeedPage />
          </main>
          <BottomNav />

          {/* Footer */}
          <footer
            className="py-2 text-center text-[10px]"
            style={{
              background: "#0A1520",
              color: "rgba(255,255,255,0.3)",
            }}
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
      <Toaster />
    </QueryClientProvider>
  );
}
