#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  Baladio — Start Server (Linux / macOS)
#  Logs go to: logs/server.log
#  View live logs with: ./view-logs.sh
# ─────────────────────────────────────────────────────────────────

# Resolve the directory this script lives in (follows symlinks)
APP_DIR="$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")" && pwd)"
LOG_DIR="$APP_DIR/logs"
LOG_FILE="$LOG_DIR/server.log"
PID_FILE="$APP_DIR/.server.pid"

# Check Node.js is installed
if ! command -v node &>/dev/null; then
    echo "ERROR: node is not installed or not on PATH." >&2
    exit 1
fi

# Bail if app folder doesn't look right
if [ ! -f "$APP_DIR/server.js" ]; then
    echo "ERROR: Cannot find server.js in $APP_DIR" >&2
    exit 1
fi

# Create logs folder if needed
mkdir -p "$LOG_DIR"

# If a PID file exists, check if the process is still running
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        echo "Server is already running (PID $OLD_PID). Use ./stop-server.sh to stop it first."
        exit 0
    fi
fi

# Stamp the log
{
    printf '%0.s-' {1..60}; echo
    echo "[STARTED] $(date)"
    printf '%0.s-' {1..60}; echo
} >> "$LOG_FILE"

# Launch in background, redirect stdout+stderr to log
nohup node "$APP_DIR/server.js" >> "$LOG_FILE" 2>&1 &
SERVER_PID=$!
echo "$SERVER_PID" > "$PID_FILE"

echo "Baladio server started (PID $SERVER_PID)"
echo "  Logs:   $LOG_FILE"
echo "  Open:   http://localhost:3000"
echo "  Stop:   ./stop-server.sh"
