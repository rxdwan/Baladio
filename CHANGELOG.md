# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2026-08-19
### Added
- **Global App Settings**: New settings menu (gear icon) for centralized application preferences.
- **Auto-Play Persistence**: Toggle option to automatically resume playback on application startup.
- **iTunes Cover Art Integration**: Automatically fetches high-resolution (600x600) cover art from the iTunes API for songs missing artwork.
- **Cover Art Overrides**: Added a "Prioritize online cover art" setting to globally force iTunes artwork over local ID3 tags and user uploads (safely preserving user uploads in the background).
- **Default Cover Upload**: Upload a custom global fallback image for songs lacking cover art, with an easy reset button.
- **Analytics Management**: Ability to safely reset all playback history and analytics data directly from settings.

### Fixed
- **Cover Art Reverting**: Added a "Revert iTunes Art" button in individual song settings to safely restore original embedded covers.

## [2.3.0] - 2026-08-18
### Added
- **Synced Lyrics Integration**: Real-time synchronized lyrics fetching silently in the background via LRCLIB. Local `.lrc` files take priority.
- **Customizable Lyrics Layout**: Drag-and-drop to position lyrics either on the "Side" (split screen) or "Top" (Apple Music-style 5-line stack with graduated opacity and scale).
- **Notification Centre**: In-app notification system (bell icon) to manage asynchronous events and background tasks.
- **Fuzzy Lyrics Matching**: Proposes up to 5 candidates in the Notification Centre when exact lyrics aren't found. Matches can be manually confirmed and saved instantly.

### Fixed
- **Analytics Caching Bug**: Fixed a bug where the home page would display empty/stale analytics (`-`) after navigation.
- **Back Button Clipping**: Resolved a visual bug where the "Back" button clipped behind the search bar during hover.
- **Layout Shifting**: Prevented fullscreen album art from shifting before lyrics were fully loaded.
- **Duplicate Notifications**: Added database checks to prevent multiple identical notifications for the same song.

## [2.2.0] - 2026-08-15
### Added
- **OS Media Controls**: Full Media Session API integration for hardware media keys, lock screen controls, and native OS overlay metadata.
- **Up Next Toasts**: Intelligent queue progression with sleek rectangular "Up Next" toast notifications sliding in from the right 10 seconds before the track ends.
- **Loading Animations**: Sleek startup loading animations and custom cursor blob designs.
- **Loudness Normalization**: Two-tier LUFS loudness normalization via ReplayGain tags and `ffmpeg`.
- **Magnetic Volume Control**: Volume slider snaps magnetically to 100%, with keyboard shortcut integrations.
- **Theme Color Adoption**: Dynamic UI accenting where play buttons, speed range circles, and progress bars adopt the dominant color of the current track.

### Fixed
- **OS Media Bug**: Fixed a bug where OS UI metadata wouldn't update reliably.

## [2.1.0] - 2026-08-12
### Added
- **SQLite Engine**: Migrated analytics data storage from JSON files to SQLite for vastly improved database performance.
- **Stable UUID Architecture**: Migrated song primary keys from filenames to stable UUIDs for robust internal tracking.
- **Listening Thresholds**: Accurate tracking of listening time (ensuring users actually listen rather than seek), with plays registering after 20 seconds.
- **Smart Parsing**: Artist names are smartly split on `&` and `,` for accurate top artist tracking; "Unknown Artist" is dynamically excluded from metrics.
- **Metadata Editor**: In-app editing of ID3 tags (Title/Artist) and an option to automatically rename physical files on disk.

### Fixed
- **Empty Analytics Stats**: Fixed an issue where empty analytics stats showed `undefined` instead of `0`.
- **Drag-and-Drop Image Flickering**: Reordered songs within playlists via seamless drag-and-drop, optimized to prevent image flickering.

## [2.0.0] - 2026-07-20
### Added
- **Local Audio Engine**: Play local `.mp3` and `.mp4` files without any external servers or streaming.
- **Advanced Audio Effects**: Spatial 8D Audio, Convolution Reverb, and Custom playback speed controls.
- **Glassmorphic UI Engine**: Light and dark themes with dynamic ambient backdrops.
- **Playlist Capabilities**: Create, rename, delete, and set custom covers for user-generated playlists.
- **Artwork Engine**: Custom default song covers, automated ID3 embedded art extraction, and MP4 video first-frame extraction via `ffmpeg`.
- **Analytics Dashboard**: Home view featuring day streaks, hottest playlists, and top artists.
