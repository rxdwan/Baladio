#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  Baladio — Stop Server (Linux / macOS)
# ─────────────────────────────────────────────────────────────────

PORT=3000
APP_DIR="$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")" && pwd)"
PID_FILE="$APP_DIR/.server.pid"

STOPPED=0

# Try PID file first (fastest, most reliable)
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        kill "$PID" && rm -f "$PID_FILE"
        echo "Server stopped (PID $PID)."
        STOPPED=1
    else
        # Stale PID file
        rm -f "$PID_FILE"
    fi
fi

# Fallback: kill whatever is listening on the port
if [ "$STOPPED" -eq 0 ]; then
    # lsof is available on most Linux/macOS systems
    if command -v lsof &>/dev/null; then
        PID=$(lsof -ti tcp:"$PORT" 2>/dev/null | head -1)
        if [ -n "$PID" ]; then
            kill "$PID" 2>/dev/null
            echo "Server on port $PORT stopped (PID $PID)."
            STOPPED=1
        fi
    # fuser fallback (common on Debian/Ubuntu)
    elif command -v fuser &>/dev/null; then
        fuser -k "$PORT/tcp" 2>/dev/null && echo "Server on port $PORT stopped." && STOPPED=1
    fi
fi

if [ "$STOPPED" -eq 0 ]; then
    echo "No server found running on port $PORT."
fi
