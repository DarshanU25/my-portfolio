# Keep-Alive Ping Timer Guide for Render

This directory contains automated scripts to prevent your **Render Free Tier backend** from going to sleep.

## Why This Is Needed
On Render's free tier, web services spin down after **15 minutes of inactivity**. When a new visitor opens your portfolio, they would experience a **50+ second cold start** delay.

By sending a lightweight HTTP request to `/api/ping` every **5 to 10 minutes**, the backend stays permanently awake, responsive, and ready in `< 100ms`!

---

## Option 1: Google Apps Script Timer (Recommended — 100% Free Forever)

Google Apps Script runs on Google's cloud servers completely free with zero maintenance.

### Step-by-Step Setup:
1. Open **[script.google.com](https://script.google.com)** in your browser.
2. Click **New project** (top-left).
3. Copy the entire contents of `keep-alive/google-apps-script.js` and paste it into the script editor.
4. Replace the URL on line 42 with your live Render service URL:
   ```javascript
   var RENDER_BACKEND_URL = "https://your-backend-app.onrender.com";
   ```
5. Click **Save** (disk icon or `Ctrl + S`).
6. In the function dropdown at the top, select `testPing` and click **Run**.
   - If prompted for permission, click *Review Permissions* -> choose your account -> *Advanced* -> *Go to project (unsafe)* -> *Allow*.
   - Check the Execution log below: you should see `Status: 200`!
7. On the left navigation bar, click the **Triggers (⏰ clock icon)**.
8. Click **+ Add Trigger** (bottom right):
   - **Choose which function to run:** `pingPortfolioBackend`
   - **Select event source:** `Time-driven`
   - **Select type of time based trigger:** `Minutes timer`
   - **Select minute interval:** `Every 5 minutes`
9. Click **Save**.

Your backend will now stay warm 24/7!

---

## Option 2: GitHub Actions Scheduled Cron (Alternative)

We have also included `.github/workflows/keep-alive-cron.yml`. If you push this repository to GitHub:
1. Go to your repo -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Add a repository secret named `RENDER_BACKEND_URL` with your Render backend URL (e.g. `https://your-backend-app.onrender.com`).
3. GitHub Actions will trigger `curl -s "${RENDER_BACKEND_URL}/api/ping"` every 10 minutes automatically!

---

## Testing Your Ping Endpoint Manually
You can test the keep-alive endpoint anytime from PowerShell or terminal:
```bash
curl -I https://your-backend-app.onrender.com/api/ping
```
Expected response: `HTTP/2 200 OK` with JSON status and server uptime.
