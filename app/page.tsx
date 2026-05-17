"use client";

import LanguageModal from "@/components/LanguageModal";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootPage() {
  return (
    <ThemeProvider>
      <div style={{ minHeight: "100vh", background: "var(--bg-dark, #0e0c09)" }}>
        <LanguageModal alwaysShow />
      </div>
    </ThemeProvider>
  );
}
