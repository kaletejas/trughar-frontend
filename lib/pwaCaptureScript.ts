// Inline script injected into <head> by app/layout.tsx.
// `beforeinstallprompt` fires once, often before React hydrates, so it must be
// captured here and stored on `window` for the install buttons (lib/pwaInstall.ts).
// The event name must match PWA_EVENT in lib/pwaInstall.ts.
export const pwaCaptureScript = `
(function () {
  window.__pwaInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new Event('pwa-install-change'));
  });
  window.addEventListener('appinstalled', function () {
    window.__pwaInstallPrompt = null;
    window.__pwaInstalled = true;
    window.dispatchEvent(new Event('pwa-install-change'));
  });
})();
`;
