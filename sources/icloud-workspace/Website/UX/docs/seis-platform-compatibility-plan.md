# SEIS Platform Compatibility Plan

Date: 2026-05-27
Scope: `apps/site-next` and `packages/content`

## Purpose

This phase creates a calm compatibility spine for HTML, CSS, JavaScript, JSON, Android, iPhone/iOS, Windows and Apple ecosystem planning without jumping into heavy native implementation yet.

## Implemented Surface

- `/compatibility` presents the platform matrix, device behavior rules and governance principles.
- `/api/platform-compatibility` exposes the same typed compatibility registry for future tools.
- `packages/content/src/platform-compatibility.ts` is the typed source for platform targets, device modes and principles.
- `check:platform-compatibility` guards required platform IDs, device IDs, principles and active/planned status parity.

## Current Contract

- Active production base: HTML, CSS, JavaScript and JSON.
- Planned expansion: Android, iPhone/iOS, Windows, macOS and Apple Watch.
- Motion baseline: viewport-active, reduced-motion aware and mobile-parallax off by default.
- Native baseline: Swift, Android, desktop and wearable lanes start from adapters before production code.

## Next Planning Phase

The next motion and 3D planning session can safely build on this by defining:

- PWA install metadata and offline fallback.
- iOS Safari and Android Chrome smoke scenarios.
- SwiftUI, Kotlin and desktop wrapper adapter contracts.
- GPU-safe Three.js budgets for phone, tablet and desktop.
- Apple companion behavior for short reminders and glanceable status.
