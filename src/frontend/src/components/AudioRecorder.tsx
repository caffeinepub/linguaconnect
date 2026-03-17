import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WAVE_BARS = 28;
const WAVE_INDICES = Array.from({ length: WAVE_BARS }, (_, i) => i);

interface AudioRecorderProps {
  onConfirm: (transcript: string) => void;
}

export function AudioRecorder({ onConfirm }: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recording]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleRecord = () => {
    setRecording(true);
    setDone(false);
    setSeconds(0);
  };

  const handleStop = () => {
    setRecording(false);
    setDone(true);
  };

  const handleConfirm = () => {
    onConfirm(
      "Transcription simulée — Bonjour tout le monde, voici mon message audio !",
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {/* Waveform visualization */}
      <div className="flex items-end gap-[3px] h-14 w-full justify-center">
        {WAVE_INDICES.map((i) => (
          <motion.div
            key={`wave-bar-${i}`}
            className="w-[3px] rounded-full"
            style={{
              background: recording ? "#3D6FE0" : "rgba(255,255,255,0.2)",
            }}
            animate={
              recording
                ? {
                    height: [
                      `${10 + ((i * 7) % 30)}%`,
                      `${40 + ((i * 13) % 50)}%`,
                      `${15 + ((i * 11) % 35)}%`,
                    ],
                  }
                : { height: "15%" }
            }
            transition={{
              duration: 0.6 + (i % 5) * 0.1,
              repeat: recording ? Number.POSITIVE_INFINITY : 0,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Timer */}
      <div
        className="text-2xl font-mono font-bold tracking-widest"
        style={{ color: recording ? "#3D6FE0" : "rgba(255,255,255,0.5)" }}
      >
        {formatTime(seconds)}
      </div>

      {/* Record / Stop button */}
      {!done && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={recording ? handleStop : handleRecord}
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all"
          style={{
            background: recording ? "#ef4444" : "#3D6FE0",
            boxShadow: recording
              ? "0 0 0 8px rgba(239,68,68,0.2), 0 4px 20px rgba(239,68,68,0.4)"
              : "0 0 0 8px rgba(61,111,224,0.2), 0 4px 20px rgba(61,111,224,0.4)",
          }}
          aria-label={
            recording ? "Arrêter l'enregistrement" : "Démarrer l'enregistrement"
          }
          data-ocid="audio.toggle"
        >
          {recording ? (
            <div className="w-6 h-6 rounded bg-white" />
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              role="img"
              aria-label="Microphone"
            >
              <title>Microphone</title>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path
                d="M19 10v2a7 7 0 0 1-14 0v-2"
                strokeWidth="2"
                stroke="white"
                fill="none"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="19"
                x2="12"
                y2="23"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="23"
                x2="16"
                y2="23"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.button>
      )}

      {/* Label */}
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {recording
          ? "Enregistrement en cours..."
          : done
            ? ""
            : "Appuyez pour enregistrer"}
      </p>

      {/* After stop: transcript preview + confirm */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col gap-3"
        >
          <div
            className="p-3 rounded-xl text-sm"
            style={{
              background: "rgba(61,111,224,0.15)",
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(61,111,224,0.3)",
            }}
          >
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: "#3D6FE0" }}
            >
              📝 Transcription simulée
            </p>
            <p>Bonjour tout le monde, voici mon message audio !</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setSeconds(0);
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
              data-ocid="audio.secondary_button"
            >
              Réenregistrer
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: "#3D6FE0", color: "white" }}
              data-ocid="audio.confirm_button"
            >
              Confirmer
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
