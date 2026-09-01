// Storage access can throw (Safari Private/Lockdown mode, in-app browsers like
// Instagram/Messenger/iMessage, strict privacy settings) — every read/write
// here is guarded so a storage failure never crashes the React tree.

export const safeLocalStorage = {
  get(key: string): string | null {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, value);
    } catch {
      // no-op — storage unavailable
    }
  },
};

export function getCookie(name: string): string | null {
  try {
    if (typeof document === "undefined") return null;
    const match = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${name}=`));
    return match ? decodeURIComponent(match.trim().slice(name.length + 1)) : null;
  } catch {
    return null;
  }
}

export function setCookie(name: string, value: string): void {
  try {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // no-op — storage unavailable
  }
}
