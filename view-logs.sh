#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  Baladio — View Live Logs (Linux / macOS)
#  Press Ctrl+C to stop watching
# ─────────────────────────────────────────────────────────────────

APP_DIR="$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")" && pwd)"
LOG_FILE="$APP_DIR/logs/server.log"

if [ ! -f "$LOG_FILE" ]; then
    echo "No log file found yet. Start the server first (./start-server.sh)"
    exit 1
fi

echo "Watching live logs — Press Ctrl+C to stop"
echo "============================================"
tail -n 50 -f "$LOG_FILE"
