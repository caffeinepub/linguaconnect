import {
  ChevronRight,
  Music2,
  RotateCcw,
  Sparkles,
  Timer,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

interface VideoCreateSheetProps {
  open: boolean;
  onClose: () => void;
}

export function VideoCreateSheet({ open, onClose }: VideoCreateSheetProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState<15 | 60 | 180>(60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordTime(0);
    } else {
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordTime((t) => {
          if (t >= selectedDuration - 1) {
            clearInterval(timerRef.current!);
            setIsRecording(false);
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
  };

  const handleClose = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    setRecordTime(0);
    onClose();
  };

  const progress = (recordTime / selectedDuration) * 100;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}s`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="tiktok-creator"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "#000" }}
          data-ocid="videocreate.container"
        >
          {/* Simulated camera preview */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(160deg, #0a0a12 0%, #111520 40%, #0d1a0f 100%)",
              }}
            />
            {/* subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "33.33% 33.33%",
              }}
            />
            {/* camera label */}
            {!isRecording && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/20 text-sm">Aperçu caméra</p>
              </div>
            )}
            {/* Recording blink */}
            {isRecording && (
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ background: "rgba(0,0,0,0.5)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                />
                <span className="text-white text-xs font-bold">
                  {formatTime(recordTime)}
                </span>
              </motion.div>
            )}
          </div>

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-12 pb-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center"
              data-ocid="videocreate.close_button"
            >
              <X size={26} className="text-white" />
            </button>

            {/* Duration selector */}
            <div
              className="flex items-center rounded-full overflow-hidden"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              {([15, 60, 180] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDuration(d)}
                  className="px-3 py-1 text-xs font-semibold transition-colors"
                  style={{
                    color:
                      selectedDuration === d ? "#000" : "rgba(255,255,255,0.6)",
                    background: selectedDuration === d ? "#fff" : "transparent",
                    borderRadius: 20,
                  }}
                >
                  {d === 180 ? "3 min" : `${d}s`}
                </button>
              ))}
            </div>

            {/* Flip */}
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center"
              data-ocid="videocreate.flip_button"
            >
              <RotateCcw size={22} className="text-white" />
            </button>
          </div>

          {/* Right toolbar */}
          <div className="absolute right-4 top-1/4 z-10 flex flex-col items-center gap-6">
            {[
              { icon: Zap, label: "Flash" },
              { icon: Timer, label: "Minuteur" },
              { icon: Sparkles, label: "Effets" },
              { icon: Music2, label: "Son" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex flex-col items-center gap-1"
                data-ocid="videocreate.toolbar_button"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-white text-[10px]">{label}</span>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          {isRecording && (
            <div className="absolute top-0 left-0 right-0 z-20 h-1">
              <motion.div
                className="h-full rounded-r-full"
                style={{ background: "#FE2C55", width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          {/* Bottom controls */}
          <div className="relative z-10 mt-auto pb-10 flex flex-col items-center gap-4">
            {/* Effect hints */}
            {!isRecording && (
              <div className="flex items-center gap-2 mb-2">
                {["Tendance", "Filtres", "Beauté", "Fond"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className="px-3 py-1 rounded-full text-xs text-white font-medium"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    data-ocid="videocreate.filter_button"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-end justify-between w-full px-8">
              {/* Gallery */}
              <button
                type="button"
                className="flex flex-col items-center gap-1"
                data-ocid="videocreate.gallery_button"
              >
                <div
                  className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <Upload size={20} className="text-white" />
                </div>
                <span className="text-white/70 text-[10px]">Galerie</span>
              </button>

              {/* Record button */}
              <button
                type="button"
                onClick={toggleRecord}
                className="flex items-center justify-center relative"
                style={{ width: 88, height: 88 }}
                data-ocid="videocreate.record_button"
              >
                {/* outer ring */}
                <div
                  className="absolute inset-0 rounded-full border-4"
                  style={{ borderColor: "#fff" }}
                />
                {/* inner button */}
                <motion.div
                  animate={{
                    scale: isRecording ? 0.45 : 1,
                    borderRadius: isRecording ? "8px" : "50%",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-16 h-16"
                  style={{ background: "#FE2C55" }}
                />
              </button>

              {/* Next / Effects */}
              <button
                type="button"
                className="flex flex-col items-center gap-1"
                data-ocid="videocreate.next_button"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <ChevronRight size={22} className="text-white" />
                </div>
                <span className="text-white/70 text-[10px]">Suite</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
