# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Core Application & Playback
- **Local Audio Engine**: Play local `.mp3` and `.mp4` files without any external servers or streaming.
- **Advanced Audio Effects**: 
  - **Spatial 8D Audio**: HRTF-based binaural panning via Web Audio API.
  - **Reverb & Deep Bass**: Convolution reverb with synthetic impulse responses and pitch-shifted bass boost.
  - **Playback Speed**: Custom speed controls (0.5× to 2×) with scroll wheel support.
- **Loudness Normalization**: Two-tier LUFS loudness normalization via ReplayGain tags and `ffmpeg`.
- **Magnetic Volume Control**: Volume slider snaps magnetically to 100%, with keyboard shortcut integrations.
- **OS Media Controls**: Full Media Session API integration for hardware media keys, lock screen playback controls, and native OS overlay metadata (title, artist, cover art).

### UI & Aesthetics
- **Glassmorphic UI Engine**: Light and dark themes with dynamic ambient backdrops featuring dominant color extraction from album covers.
- **Mobile Support**: Fully responsive layout designed for mobile web browsers.
- **Theme Color Adoption**: Dynamic UI accenting where play buttons, speed range circles, and progress bars adopt the dominant color of the current track.
- **Loading Animations**: Sleek startup loading animations and custom cursor blob designs.
- **Global Search**: Glassmorphic dropdown search overlay to instantly filter all songs by title or artist, showing playlist tags and direct add-to-playlist buttons.

### Library & Playlist Management
- **Stable UUID Architecture**: Migrated song primary keys from filenames to stable UUIDs for robust internal tracking.
- **Playlist Capabilities**: Create, rename, delete, and set custom covers for user-generated playlists.
- **Drag-and-Drop Ordering**: Reorder songs within playlists via seamless drag-and-drop (optimized to prevent image flickering).
- **Metadata Editor**: In-app editing of ID3 tags (Title/Artist) and an option to automatically rename the physical files on disk to match.
- **Artwork Engine**: Custom default song covers, automated ID3 embedded art extraction, and MP4 video first-frame extraction via `ffmpeg`.

### Synced Lyrics & Notifications
- **Synced Lyrics Integration**: Real-time synchronized lyrics fetching silently in the background via LRCLIB. Local `.lrc` files take priority.
- **Customizable Lyrics Layout**: Drag-and-drop to position lyrics either on the "Side" (split screen) or "Top" (Apple Music-style 5-line stack with graduated opacity and scale).
- **Notification Centre**: In-app notification system (bell icon) to manage asynchronous events and background tasks.
- **Fuzzy Lyrics Matching**: When exact lyrics aren't found, the system proposes up to 5 candidates in the Notification Centre. Users can manually confirm matches, which save and load instantly.
- **Up Next Toasts**: Intelligent queue progression with sleek rectangular "Up Next" toast notifications sliding in from the right 10 seconds before the current track ends.

### Analytics & History
- **SQLite Engine**: Migrated analytics data storage from JSON files to SQLite for vastly improved database performance.
- **Listening Thresholds**: Accurate tracking of listening time (ensuring users actually listen rather than seek), with plays only registering after 20 seconds.
- **Smart Parsing**: Artist names are smartly split on `&` and `,` for accurate top artist tracking; "Unknown Artist" is dynamically excluded from metrics.
- **Analytics Dashboard**: Home view featuring day streaks, hottest playlists, top artists, and a total song count badge in the Explore section.

### Fixed
- **OS Media Bug**: Fixed a bug where OS UI metadata wouldn't update reliably by moving the Media Session update inside the `play()` promise resolution.
- **Analytics Caching Bug**: Fixed a bug where the home page would display empty/stale analytics (`-`) when navigating back from other views.
- **Back Button Clipping**: Resolved a visual bug where the "Back" button clipped behind the search bar during its upward hover animation by adjusting overflow padding.
- **Layout Shifting**: Fixed an issue where the fullscreen album art would shift to make room for lyrics before the lyrics were fully fetched and parsed.
- **Player Overflow**: Properly constrained `player-left` to prevent title overflow squashing the visualizer.
- **Empty Analytics Stats**: Fixed an issue where empty analytics stats showed `undefined` instead of `0`.
- **Toast Notifications**: Fixed a bug where confirming a fuzzy lyric match would trigger a toast saying "undefined".
- **Duplicate Notifications**: Added a database check to prevent multiple identical fuzzy match or "not found" notifications from firing for the same song.
