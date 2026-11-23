/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: RENDER BACKEND KEEP-ALIVE PING TIMER
 * ==============================================================================
 * Free automated keep-alive pinger for Darshan Ubhale's Portfolio Backend on Render.
 * 
 * WHY THIS IS NEEDED:
 * Render free web services spin down / sleep after 15 minutes of inactivity.
 * When a visitor comes, sleeping services take 50+ seconds to cold-start.
 * 
 * This script runs completely free on Google's cloud servers every 5 minutes,
 * sending a lightweight ping to your `/api/ping` endpoint to keep it 100% warm,
 * alive, and fast 24/7!
 * 
 * ------------------------------------------------------------------------------
 * SETUP INSTRUCTIONS (Takes 60 seconds):
 * ------------------------------------------------------------------------------
 * 1. Open https://script.google.com in your browser (logged into your Google account).
 * 2. Click "New project" at top left.
 * 3. Delete any code in Code.gs and paste this entire file content.
 * 4. Replace `RENDER_BACKEND_URL` below with your live Render app URL:
 *    Example: 'https://darshan-portfolio-backend.onrender.com'
 * 5. Click the "Save" icon (or Ctrl+S).
 * 6. Run `testPing()` once by selecting "testPing" in the dropdown and clicking "Run".
 *    (Review and grant permission if prompted).
 * 7. In the left sidebar, click the "Triggers" alarm-clock icon (⏰).
 * 8. Click "+ Add Trigger" (bottom right).
 * 9. Configure trigger settings:
 *    - Choose which function to run: `pingPortfolioBackend`
 *    - Which runs at deployment: `Head`
 *    - Select event source: `Time-driven`
 *    - Select type of time based trigger: `Minutes timer`
 *    - Select minute interval: `Every 5 minutes`
 * 10. Click "Save". DONE!
 * 
 * Your Render backend will now stay alive 24/7 for 0 cost!
 * ==============================================================================
 */

// REPLACE WITH YOUR ACTUAL RENDER APP URL
var RENDER_BACKEND_URL = "https://your-backend-app.onrender.com";

/**
 * Main ping function triggered every 5 minutes by Google Apps Script timer.
 */
function pingPortfolioBackend() {
  var pingEndpoint = RENDER_BACKEND_URL.replace(/\/+$/, '') + "/api/ping";
  
  var options = {
    method: "get",
    muteHttpExceptions: true,
    headers: {
      "User-Agent": "Google-Apps-Script-KeepAlive/1.0 (Darshan-Portfolio-PingTimer)",
      "Accept": "application/json"
    }
  };

  try {
    var startTime = new Date().getTime();
    var response = UrlFetchApp.fetch(pingEndpoint, options);
    var durationMs = new Date().getTime() - startTime;
    var statusCode = response.getResponseCode();
    var responseBody = response.getContentText();

    Logger.log("[" + new Date().toISOString() + "] PING SUCCESS!");
    Logger.log("Status: " + statusCode + " (" + durationMs + "ms)");
    Logger.log("Response: " + responseBody.substring(0, 200));

    // Optional: Log ping stats into script properties for debugging
    PropertiesService.getScriptProperties().setProperty("LAST_PING_TIME", new Date().toISOString());
    PropertiesService.getScriptProperties().setProperty("LAST_STATUS_CODE", statusCode.toString());
    PropertiesService.getScriptProperties().setProperty("LAST_LATENCY_MS", durationMs.toString());

  } catch (error) {
    Logger.log("[" + new Date().toISOString() + "] PING FAILED: " + error.toString());
  }
}

/**
 * Run this function once manually in Google Apps Script editor to test connectivity!
 */
function testPing() {
  Logger.log("Testing ping to: " + RENDER_BACKEND_URL);
  pingPortfolioBackend();
}
