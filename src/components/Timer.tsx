"use client";
import React, { useEffect, useRef, useState } from "react";

type Mode = "work" | "short" | "long";

const DEFAULTS = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Timer() {
  const [mode, setMode] = useState<Mode>("work");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULTS.work);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setSecondsLeft(DEFAULTS[mode]);
    setRunning(false);
  }, [mode]);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            // session finished
            setRunning(false);
            setCompleted((c) => c + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000) as unknown as number;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code === "Space") {
        setRunning((r) => !r);
      } else if (e.key.toLowerCase() === "r") {
        setSecondsLeft(DEFAULTS[mode]);
        setRunning(false);
      } else if (e.key.toLowerCase() === "s") {
        // skip to next mode (simple rotation)
        setMode((m) => (m === "work" ? "short" : m === "short" ? "long" : "work"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  function startPause() {
    setRunning((r) => !r);
  }
  function reset() {
    setSecondsLeft(DEFAULTS[mode]);
    setRunning(false);
  }
  function skip() {
    setMode((m) => (m === "work" ? "short" : m === "short" ? "long" : "work"));
  }
  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 18 }}>
        <button onClick={() => setMode("work")} style={mode === "work" ? styles.modeActive : styles.mode}>Work</button>
        <button onClick={() => setMode("short")} style={mode === "short" ? styles.modeActive : styles.mode}>Short</button>
        <button onClick={() => setMode("long")} style={mode === "long" ? styles.modeActive : styles.mode}>Long</button>
      </div>

      <div style={styles.timerCard}>
        <div style={styles.time}>{formatTime(secondsLeft)}</div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button onClick={startPause} style={styles.control}>{running ? "Pause" : "Start"}</button>
          <button onClick={reset} style={styles.control}>Reset</button>
          <button onClick={skip} style={styles.control}>Skip</button>
        </div>
        <div style={{ marginTop: 14, color: "#cbd5e1" }}>Completed sessions: {completed}</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  mode: {
    padding: "8px 14px",
    borderRadius: 8,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
  },
  modeActive: {
    padding: "8px 14px",
    borderRadius: 8,
    background: "#1E90FF",
    border: "none",
    color: "#00203F",
    cursor: "pointer",
    fontWeight: 600
  },
  timerCard: {
    background: "linear-gradient(180deg,#06203a, #083047)",
    padding: 24,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(2,6,23,0.6)"
  },
  time: {
    fontSize: 64,
    fontWeight: 700,
    color: "#ffffff"
  },
  control: {
    padding: "8px 14px",
    borderRadius: 8,
    background: "#0B2B5A",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
