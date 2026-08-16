# DigiSecure — Device Security & Monitoring

A Next.js 14 + TypeScript + Tailwind implementation of the DigiSecure app, built from the Figma file "DigiSecure (Copy)" — following the actual screen designs (Login, Sign Up, Onboarding, Homepage) and the "Locate a lost device" user flow (Splash → Auth → Home → Device Management → Device Tracking).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. On desktop it renders inside a phone-shaped frame; on mobile it fills the screen.

## What's implemented

- **Auth** — Sign up / log in / forgot password, backed by a mock client-side auth layer (localStorage). No real backend; swap `src/lib/auth-context.tsx` for a real API when ready.
- **Home dashboard** — matches the Figma "Homepage 1" screen: hero header, 3 feature buttons (Device Management, Incident Response & Recovery, Threat Intelligence), Key Features section.
- **Device Management**
  - Register a device (type picker + name)
  - Manage devices (lock/unlock, mark as lost, erase, expandable cards)
  - **Device Tracking** — the flagship flow from the task ("Emeka wants to locate a lost device"): pick a device → Locate → animated map pin → success feedback with coordinates → Lock / Play Sound / Mark as Lost actions, with an error/offline branch matching the flow diagram's "Error Feedback" step.
- **Incident Response & Recovery** — run a vulnerability assessment per device, branching into the "Is Vulnerability Detected?" Yes/No paths from the flow (Notify Security Team / Secure Backup vs. Continue Monitoring).
- **Threat Intelligence** — live-style risk feed and per-device status.
- **Account / Settings & Privacy** — profile, notification/biometric toggles, log out.

## Design system (pulled from Figma)

| Token | Value |
|---|---|
| Forest (primary/hero bg) | `#344D3C` |
| Sage (secondary buttons) | `#71AA83` |
| Mist / Fog (input backgrounds) | `#EBEEEC` / `#ECEDF1` |
| Ice (light text on dark bg) | `#E1E6E3` |
| Slate (links) | `#C3C8D5` |
| Cyan (logo accent) | `#26D2D0` |
| Display font | Raleway (SemiBold/Bold) |
| Body font | Poppins (Regular/Medium/Bold) |
| Corner radius | 16px |

Fonts are self-hosted via `@fontsource` (Google Fonts' CDN wasn't reachable in the build sandbox — swap to `next/font/google` if you'd prefer and have network access).

## Notes / next steps

- All data is mocked client-side (localStorage) — no backend yet. Devices reset if you clear browser storage.
- The map on the Device Tracking screen is a stylized SVG, not a live map — swap in Mapbox/Google Maps when you have API keys.
- MFA screens exist in the Figma file but weren't in the requested flow, so they're not built yet — happy to add them next.
