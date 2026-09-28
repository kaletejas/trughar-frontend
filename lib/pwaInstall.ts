'use client';

import { useSyncExternalStore } from 'react';

// Shared PWA install state.
// The browser fires `beforeinstallprompt` only once per page load, usually before
// React hydrates. An inline script in app/layout.tsx captures it on `window`, and
// this module exposes it to every install button so they all share one prompt.

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    __pwaInstallPrompt?: BeforeInstallPromptEvent | null;
    __pwaInstalled?: boolean;
  }
}

export type InstallStatus = 'installed' | 'available' | 'ios' | 'unavailable';

// Fired by the inline capture script (lib/pwaCaptureScript.ts) whenever state changes
export const PWA_EVENT = 'pwa-install-change';

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function getSnapshot(): InstallStatus {
  if (window.__pwaInstalled || isStandalone()) return 'installed';
  if (window.__pwaInstallPrompt) return 'available';
  // iOS Safari never fires beforeinstallprompt; install is manual via Share menu
  if (isIos()) return 'ios';
  return 'unavailable';
}

function getServerSnapshot(): InstallStatus {
  return 'unavailable';
}

function subscribe(callback: () => void) {
  window.addEventListener(PWA_EVENT, callback);
  return () => window.removeEventListener(PWA_EVENT, callback);
}

export function usePwaInstall() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  async function install() {
    if (status === 'ios') {
      alert('To install TruGhar, tap the Share button in Safari and choose "Add to Home Screen".');
      return;
    }

    const prompt = window.__pwaInstallPrompt;
    if (!prompt) return;

    // A prompt event can only be used once
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new Event(PWA_EVENT));

    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      window.__pwaInstalled = true;
      window.dispatchEvent(new Event(PWA_EVENT));
    }
  }

  return { status, canInstall: status === 'available' || status === 'ios', install };
}
