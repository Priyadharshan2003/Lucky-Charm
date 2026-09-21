# 🎉 Lucky Charm v2.0.0 

*Small Objects. Meaningful Connections.*
Your traditions, culture, and identity — now dangling live from your desktop with real-time physics.

## ✨ What's New

### 🔬 Real-Time Physics Engine
- **Custom Verlet Integration rope simulation** — charms swing, stretch, and settle with fluid, realistic motion.
- **120 FPS canvas-rendered animation loop** with hardware acceleration.
- **Mouse reactivity** — the rope and charm respond naturally to your cursor in real-time.
- **Drag & Flick** — grab the charm or anchor point, fling it across the screen.

### 🧿 30+ Culturally Curated Charms
Six handcrafted collections, each with unique SVG charms:

| Collection | Charms |
| :--- | :--- |
| **Tamil Divine** | Vel, Vinayagar Coin, Karuppu Statue, Om Symbol, Temple Bell |
| **Protection & Luck**| Nazar, Hamsa, Daruma, Nimbu Mirchi, Drishti Bommai |
| **Marvel** | Iron Man Helmet, Spider-Man, Captain America Shield, Thor Hammer, Hulk Fist |
| **DC** | Batman Symbol, Superman Shield, Wonder Woman Emblem, Flash, Green Lantern Ring |
| **BTS** | All 7 member charms for ARMY 💜 |

### 🖥 Intelligent Desktop Overlay
- **Click-through transparency** — the overlay never blocks your desktop icons or applications.
- **Flicker-free rendering** — debounced transparency toggling eliminates white-flash artifacts on Windows.
- **Smart Z-order management** — the charm sits above your wallpaper but below all open windows, always visible and never in the way.

### 🎛 Full System Tray Control
- **Instant charm switching** — select any charm from the native tray menu, applied immediately.
- **Bless ritual** — trigger a golden shimmer animation and physics flick.
- **Rope length adjustment** — extend or shorten the dangling rope.
- **Auto-cycle mode** — automatically rotate through your collection.
- **Undangle / Rehang** — dismiss and restore the charm on demand.

### 🌐 Marketing Website
- Premium Next.js 15 landing page with live physics demo.
- Collection showcase, download page, and charm gallery.
- ⭐ Star on GitHub and ☕ Buy Me a Coffee buttons in the hero section.

## 🏗 Architecture
Built as a strict monorepo with zero coupling between layers:
- `@luckycharm/physics` — Headless Verlet engine + React hooks (framework-agnostic physics)
- `@luckycharm/core` — Charm configs, rituals, collection data (shared TypeScript + JSON)
- **Tauri v3 + Rust** — Native system tray, IPC, Z-order thread, click-through management
- **Next.js 15** — Marketing site, SEO, and download portal

## ⚡ Performance

| Metric | Value |
| :--- | :--- |
| Idle CPU | < 0.5% |
| Active CPU | < 3% |
| RAM | < 45 MB |
| Framerate | 120 FPS |
| Binary Size | ~16 MB |
| Cold Start | < 300 ms |

## 📦 Downloads

| Installer | Size | Notes |
| :--- | :--- | :--- |
| `Lucky Charm_2.0.0_x64-setup.exe` | 15.90 MB | ✅ Recommended |
| `Lucky Charm_2.0.0_x64_en-US.msi` | 17.16 MB | Enterprise |

*System Requirements: Windows 11+ (x64)*  
*macOS and browser extension support coming in Phase 2.*

## 🔒 Security & Privacy
- **Fully offline** — no telemetry, no accounts, no network calls.
- All IPC commands are strongly typed and validated.
- No file system access beyond the app's own data directory.

## 🙏 Acknowledgements
Built with [Tauri](https://tauri.app/), [React 19](https://react.dev/), [Rust](https://www.rust-lang.org/), and the `windows-rs` crate.
Special thanks to every early tester and contributor.

Full Changelog: [https://github.com/Priyadharshan2003/Lucky-Dangle/commits/v2.0.0](https://github.com/Priyadharshan2003/Lucky-Dangle/commits/v2.0.0)

⭐ [Star the repo](https://github.com/Priyadharshan2003/Lucky-Dangle) if Lucky Charm brings a little magic to your day!  
☕ [Buy me a coffee](https://buymeacoffee.com/priyadharshan) to support development.
