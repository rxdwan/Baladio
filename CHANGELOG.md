# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Synced Lyrics Integration**: Real-time synchronized lyrics fetching silently in the background via LRCLIB. Local `.lrc` files take priority.
- **Fullscreen Lyrics View**: Scrolling karaoke-style lyrics panel in the fullscreen player.
- **Customizable Lyrics Layout**: Drag-and-drop to position lyrics either on the "Side" (split screen) or "Top" (Apple Music-style 5-line stack with graduated opacity and scale).
- **Notification Centre**: In-app notification system (bell icon) to manage asynchronous events and background tasks.
- **Fuzzy Lyrics Matching**: When exact lyrics aren't found, the system proposes up to 5 candidates in the Notification Centre, showing track details and duration.
- **Interactive Notifications**: Users can manually confirm correct lyrics from fuzzy matches, loading and saving them instantly without reloading the app.

### Changed
- **Player Bar Text Limit**: Increased the maximum width allowed for song titles and artists in the bottom player bar to prevent early text truncation.
- **Notification Button UI**: Updated the notification button styling to match the theme toggle button for a cohesive layout.
- **Notification Header Layout**: Implemented a 3-column grid to perfectly center the "Notification Centre" title between the back and clear buttons.

### Fixed
- **Duplicate Notifications**: Added a database check to prevent multiple identical fuzzy match or "not found" notifications from firing for the same song.
- **Layout Shifting**: Fixed an issue where the fullscreen album art would shift to make room for lyrics before the lyrics were fully fetched and parsed.
- **Back Button Clipping**: Resolved a visual bug where the "Back" button in the metadata edit and playlist views would clip behind the search bar during its upward hover animation by adjusting overflow padding.
- **Analytics Caching Bug**: Fixed a bug where the home page would display empty/stale analytics (`-`) when navigating back from other views; analytics now properly re-fetch and re-render on navigation.
- **Toast Notifications**: Fixed a bug where confirming a fuzzy lyric match would trigger a toast saying "undefined".
