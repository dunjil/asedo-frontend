# cPanel Deployment Guide for Next.js App

## The Problem
You're getting 503 errors for static files because the Next.js standalone build structure doesn't match what cPanel expects.

## Solution: Upload the correct files to cPanel

### Step 1: Build locally (already done)
```bash
npm run build
```

### Step 2: Upload these files/folders to cPanel File Manager

Upload to `/home/asedrupq/new.asedoenergygroup.com/`:

**Required files and folders:**
1. **server.js** (the root one)
2. **.env.production**
3. **.next/** folder - Copy the ENTIRE .next folder from your local build
4. **node_modules/** - Either upload or run `npm install --production` on cPanel
5. **public/** folder (if you have static assets)

### Step 3: Your .htaccess is already correct
Keep your existing .htaccess file.

### Step 4: Directory Structure on cPanel
```
/home/asedrupq/new.asedoenergygroup.com/
├── server.js
├── .env.production
├── .htaccess
├── .next/
│   ├── static/          ← THIS IS CRITICAL
│   ├── server/
│   ├── standalone/
│   └── [other files]
├── public/
└── node_modules/
```

### Step 5: Restart Node.js app in cPanel
1. Go to cPanel → Setup Node.js App
2. Click "Restart" on your application

## Why This Happens
Next.js with `output: 'standalone'` creates a complex structure. The static files need to be accessible at `/_next/static/` but they're deeply nested in the standalone folder.

## Alternative: Simplify the build
If issues persist, we can switch from standalone mode to a regular build which works better with cPanel.
