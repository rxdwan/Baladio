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

# ── Node.js version check ─────────────────────────────────────────
MIN_NODE_MAJOR=18

if ! command -v node &>/dev/null; then
    echo ""
    echo "  ERROR: Node.js is not installed or not on PATH."
    echo ""
    echo "  Fix — install Node.js LTS via nvm (recommended):"
    echo "    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    echo "    source ~/.bashrc   # or ~/.zshrc"
    echo "    nvm install --lts"
    echo "    nvm use --lts"
    echo ""
    echo "  Or download directly: https://nodejs.org/en/download"
    exit 1
fi

NODE_MAJOR=$(node -e "process.stdout.write(String(process.versions.node.split('.')[0]))")
if [ "$NODE_MAJOR" -lt "$MIN_NODE_MAJOR" ] 2>/dev/null; then
    echo ""
    echo "  ERROR: Node.js v${NODE_MAJOR} is too old. Baladio requires Node.js v${MIN_NODE_MAJOR}+."
    echo "  You have: $(node --version)"
    echo ""
    echo "  Fix — upgrade via nvm:"
    echo "    nvm install --lts"
    echo "    nvm use --lts"
    echo "    nvm alias default lts/*"
    echo ""
    exit 1
fi

# ── Bail if app folder doesn't look right ─────────────────────────
if [ ! -f "$APP_DIR/server.js" ]; then
    echo "ERROR: Cannot find server.js in $APP_DIR" >&2
    exit 1
fi

# ── Check dependencies are installed ──────────────────────────────
if [ ! -d "$APP_DIR/node_modules" ]; then
    echo ""
    echo "  Dependencies not installed. Running npm install first..."
    echo ""
    cd "$APP_DIR" && npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "  ERROR: npm install failed. See output above."
        echo "  On Ubuntu/Debian you may need: sudo apt-get install build-essential python3"
        exit 1
    fi
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
