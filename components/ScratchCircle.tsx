"use client";

import { useEffect, useRef, useState } from "react";
import { fireGoldConfetti } from "@/lib/confetti";

interface Props {
  size?: number;
  value: string;
  onComplete: () => void;
}

export default function ScratchCircle({ size = 84, value, onComplete }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);
  const drawingRef = useRef(false);
  const checkQueuedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    const grad = ctx.createRadialGradient(size * 0.35, size * 0.3, size * 0.05, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "#ecd6a0");
    grad.addColorStop(0.55, "#c9a96e");
    grad.addColorStop(1, "#9c7c45");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.globalCompositeOperation = "destination-out";

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const scratchAt = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size * 0.13, 0, Math.PI * 2);
      ctx.fill();
    };

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setDone(true);
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (rect) {
        fireGoldConfetti(
          (rect.left + rect.width / 2) / window.innerWidth,
          (rect.top + rect.height / 2) / window.innerHeight
        );
      }
      onComplete();
    };

    const checkProgress = () => {
      if (doneRef.current || checkQueuedRef.current) return;
      checkQueuedRef.current = true;
      requestAnimationFrame(() => {
        checkQueuedRef.current = false;
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let cleared = 0;
        let sampled = 0;
        for (let i = 3; i < data.length; i += 4 * 6) {
          sampled++;
          if (data[i] < 40) cleared++;
        }
        if (sampled > 0 && cleared / sampled > 0.5) finish();
      });
    };

    const onDown = (e: PointerEvent) => {
      drawingRef.current = true;
      const { x, y } = getPos(e);
      scratchAt(x, y);
    };
    const onMove = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      const { x, y } = getPos(e);
      scratchAt(x, y);
      checkProgress();
    };
    const onUp = () => {
      drawingRef.current = false;
      checkProgress();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [size, onComplete]);

  return (
    <div
      className="scratch-circle"
      ref={wrapperRef}
      style={{ width: size, height: size }}
    >
      <span className="scratch-circle-value" style={{ fontSize: size * 0.19 }}>{value}</span>
      <canvas
        ref={canvasRef}
        className={`scratch-circle-canvas${done ? " is-done" : ""}`}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
