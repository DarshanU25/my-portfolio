#!/bin/bash
set -e

# Read PORT injected by Render (default to 8080 or 10000 if not set)
PORT="${PORT:-8080}"

echo "=========================================================="
echo " Starting Darshan Ubhale Portfolio Backend Services"
echo " Host Environment: Render Cloud"
echo " Assigned Public PORT: $PORT"
echo " Architecture: YARP Gateway -> WebAPI Controllers"
echo " Keep-Alive Endpoint: http://0.0.0.0:$PORT/api/ping"
echo "=========================================================="

# Start WebApi in background on internal port 5100
echo "--> [1/2] Launching Portfolio.WebApi on http://127.0.0.1:5100..."
cd /app/webapi
ASPNETCORE_URLS="http://127.0.0.1:5100" dotnet Portfolio.WebApi.dll &
WEBAPI_PID=$!

# Wait a brief moment for WebApi initialization
sleep 2

# Start YARP Gateway in foreground on Render public port
echo "--> [2/2] Launching Portfolio.Gateway (YARP) on http://0.0.0.0:$PORT..."
cd /app/gateway
ASPNETCORE_URLS="http://0.0.0.0:$PORT" WEBAPI_URL="http://127.0.0.1:5100" dotnet Portfolio.Gateway.dll
