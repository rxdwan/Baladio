<div align="center">

# Baladio
In French, baladeur is a noun that means a personal stereo, portable music player, or walkman. `Baladio` is a combination for "baladeur" and "audio". Pronounciation: **bah-LAH-dee-oh.**

**A self-hosted, privacy-first local music player with a glassmorphism UI, spatial audio, and listening analytics.**

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JS-f7df1e?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-purple)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)

[Features](#-features) · [Getting Started](#-getting-started) · [Screenshots](#-screenshots) · [Keyboard Shortcuts](#-keyboard-shortcuts) · [License](#-license)

</div>

---

## Disclaimer
This project is made with the help of [Antigravity IDE](https://antigravity.google/). This is a vibecoded project!
> *Not sponsored by google btw.*

## Features

- **Local-first** — plays audio files directly from your machine. No accounts, no streaming, no tracking.
- **Glassmorphism UI** — dark and light themes with a frosted-glass aesthetic, animated aurora hero, floating music notes, and a liquid cursor blob.
- **Spatial 8D Audio** — HRTF-based binaural panning using the Web Audio API. Rotation continues even when the browser tab is in the background (pre-scheduled via AudioContext automation).
- **Reverb & Deep effects** — convolution reverb with synthetic impulse response + pitch-shifted bass boost.
- **Effect Config panel** — live-tune 8D speed, reverb wet/dry, and reverb tail.
- **Playback speed** — 0.5× to 2× with a dedicated speed bar below the seek bar.
- **Playlist management** — create, rename, delete, reorder (drag-to-rearrange), and set custom covers for playlists.
- **Listening analytics** — home dashboard with top song, top artist, hottest playlist, plays today, artists explored, and day streak. History stored server-side in `data/history.json`.
- **Recently Played** — horizontal scroll strip on the home page.
- **Download with effects** — exports the song with the current effect chain applied (8D, reverb, speed) as a WAV file using `OfflineAudioContext`.
- **Cover art** — reads embedded ID3 tags for MP3s, extracts the first frame of MP4s via ffmpeg, and supports custom uploaded covers.
- **Metadata editing** — edit title/artist per song; writes to ID3 tags for MP3s.
- **File rename** — renames the audio file on disk to `{Artist} - {Title}.ext` from metadata.
- **Playback persistence** — restores the last song and timestamp on page reload.

---

## Requirements

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js)
- A folder of `.mp3` or `.mp4` audio files in the same root folder as the music player.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rxdwan/baladio.git
cd baladio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your music

Create a `songs/` folder **one level above** `music_player/` and drop your `.mp3` or `.mp4` files inside:

```
your-folder/
├── songs/               ← your audio files go here
│   ├── song1.mp3
│   └── song2.mp4
└── baladio/             ← this repo
    ├── covers/          ← auto-created on first run
    ├── data/            ← auto-created on first run
    ├── public/
    ├── server.js
    └── package.json
```

### 4. Start the server

```bash
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: Auto-start on Windows

Create a `.vbs` file in your Windows Startup folder (`shell:startup`) to launch the server silently on login:

```vbs
Set objShell = CreateObject("WScript.Shell")
objShell.Run "cmd /c cd /d C:\path\to\music_player && node server.js", 0, False
```

---

## Screenshots

<table>
    <tr>
        <td><img src="/screenshots/home, playing.png"><br><sub>Home Page (song playing)</sub></td>
        <td><img src="/screenshots/explore page.png"><br><sub>Explore Page</sub></td>
    </tr>
    <tr>
        <td><img src="/screenshots/playlist page.png"><br><sub><bold>Playlists Page</bold></sub></td>
        <td><img src="/screenshots/home light theme.png"><br><sub>Home Light theme</sub></td>
    </tr>
    <tr>
        <td><img src="/screenshots/fullscreen dark & light theme.png"><br><sub>Fullscreen Dark & Light theme</sub></td>
    </tr>
    <tr>
        <td><img src="/screenshots/new playlist.png"><br><sub>Making a new playlist</sub></td>
        <td><img src="/screenshots/inside a playlist.png"><br><sub>Inside a playlist</sub></td>
    </tr>
    
</table>

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `F` | Toggle fullscreen |
| `M` | Mute / Unmute |
| `Esc` | Back|
| `→` | Move 5 seconds ahead |
| `←` | Move 5 seconds behind |
| `Shift` + `→` | Next track |
| `Shift` + `←` | Previous track |


---

## Project Structure

```
music_player/
├── covers/
│   ├── songs/           song cover images ({filename}.jpg)
│   ├── playlists/       playlist cover images ({id}.jpg)
│   └── default_song_cover.jpg
├── data/
│   ├── library.json     playlists + custom metadata
│   └── history.json     server-side play history
├── public/
│   ├── app.js           all frontend logic
│   ├── index.html       app shell
│   ├── style.css        all styles
│   └── icons.js         SVG icon library
└── server.js            Express API server
```

---


## Acknowledgements

Built with:
- [Express.js](https://expressjs.com/) — Node.js web framework
- [music-metadata](https://github.com/borewit/music-metadata) — audio tag parsing
- [node-id3](https://github.com/Zazama/node-id3) — MP3 ID3 tag writing
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) — MP4 thumbnail extraction
- Web Audio API — 8D spatial audio, reverb, and offline rendering

---

## License

```
Licensed under CC BY-NC 4.0
Credit: rxdwan — github.com/rxdwan/baladio
```