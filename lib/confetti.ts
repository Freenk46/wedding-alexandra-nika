import confetti from "canvas-confetti";

export function fireConfetti() {
  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.5, y: 0.6 },
    colors: ["#F05235", "#EAE6DD", "#111111", "#e8856a", "#ffffff"],
    ticks: 200,
  });

  // Left burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 55,
      origin: { x: 0.2, y: 0.65 },
      colors: ["#F05235", "#EAE6DD", "#111111"],
      ticks: 180,
    });
  }, 180);

  // Right burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 55,
      origin: { x: 0.8, y: 0.65 },
      colors: ["#F05235", "#EAE6DD", "#111111"],
      ticks: 180,
    });
  }, 320);
}
