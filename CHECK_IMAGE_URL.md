# Debug: Image URL Issue for Services

## The Problem
- Projects images display correctly: Works ✅
- Services images don't display: Fails ❌
- Both use the same `getImageUrl()` function

## Root Cause
The `getImageUrl()` function in `app/lib/api.ts` uses `process.env.NEXT_PUBLIC_API_URL`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${API_URL}${imagePath}`;  // ← This prepends the backend URL
};
```

## Steps to Fix

### 1. Check your production environment variable

On your production server, check if `NEXT_PUBLIC_API_URL` is set:

```bash
# If using Node.js server
echo $NEXT_PUBLIC_API_URL

# Or check the .env.production file
cat .env.production | grep NEXT_PUBLIC_API_URL
```

### 2. Ensure it's set correctly

Your `.env.production` should have:

```env
NEXT_PUBLIC_API_URL=https://backend.asedoenergygroup.com
```

**WITHOUT a trailing slash!**

### 3. Rebuild and redeploy

After setting the environment variable:

```bash
# Rebuild Next.js
npm run build

# Redeploy to your server
```

### 4. Verify the fix

After redeployment, check the browser console on the production site:

```javascript
// In browser console on new.asedoenergygroup.com
console.log(process.env.NEXT_PUBLIC_API_URL);
// Should output: https://backend.asedoenergygroup.com
```

Also inspect the image element:
- Right-click on a service image → Inspect
- Check the `src` attribute
- Should be: `https://backend.asedoenergygroup.com/uploads/2026/01/...`
- NOT: `http://localhost:8000/uploads/...` or `/uploads/...`

## Why Projects Work But Services Don't

This is strange and suggests:
1. Projects were created/viewed when `NEXT_PUBLIC_API_URL` was set correctly
2. The environment variable was changed or lost after that
3. Or there's caching happening

## Additional Check

Compare a working project image URL with a non-working service image URL in the browser:

**Project (working):**
```html
<img src="https://backend.asedoenergygroup.com/uploads/..." />
```

**Service (not working):**
```html
<img src="http://localhost:8000/uploads/..." />
or
<img src="/uploads/..." />
```

If service images show localhost or relative paths, then `NEXT_PUBLIC_API_URL` is definitely not set in production.
