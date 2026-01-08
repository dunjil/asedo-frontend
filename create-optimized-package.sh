#!/bin/bash

echo "Creating optimized cPanel deployment package (excluding large images)..."

# Clean up
rm -rf cpanel-deploy-optimized
rm -f cpanel-deploy-optimized.zip

# Create deployment directory
mkdir -p cpanel-deploy-optimized

# Copy essential files
echo "Copying server.js..."
cp server.js cpanel-deploy-optimized/

echo "Copying .env.production..."
cp .env.production cpanel-deploy-optimized/

echo "Copying .next production build files (excluding dev cache)..."
mkdir -p cpanel-deploy-optimized/.next
# Copy only production files, exclude dev cache
cp -r .next/static cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp -r .next/server cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/BUILD_ID cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/build-manifest.json cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/prerender-manifest.json cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/routes-manifest.json cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/required-server-files.js cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/fallback-build-manifest.json cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/images-manifest.json cpanel-deploy-optimized/.next/ 2>/dev/null || true
cp .next/trace-build cpanel-deploy-optimized/.next/ 2>/dev/null || true

echo "Copying optimized public folder (excluding large images)..."
mkdir -p cpanel-deploy-optimized/public

# Copy only essential files and small images
cp -r public/logos cpanel-deploy-optimized/public/ 2>/dev/null || true
cp -r public/flags cpanel-deploy-optimized/public/ 2>/dev/null || true
cp -r public/maps cpanel-deploy-optimized/public/ 2>/dev/null || true

# Copy small files
find public -maxdepth 1 -type f -size -100k -exec cp {} cpanel-deploy-optimized/public/ \;

# Copy favicon and icons (small files)
cp public/favicon* cpanel-deploy-optimized/public/ 2>/dev/null || true
cp public/apple-touch-icon.png cpanel-deploy-optimized/public/ 2>/dev/null || true
cp public/web-app-manifest* cpanel-deploy-optimized/public/ 2>/dev/null || true
cp public/site.webmanifest cpanel-deploy-optimized/public/ 2>/dev/null || true

# Copy small background images if they exist and are small
find public/backgrounds -name "*.webp" -size -500k -exec cp {} cpanel-deploy-optimized/public/backgrounds/ \; 2>/dev/null || true
mkdir -p cpanel-deploy-optimized/public/backgrounds
cp public/backgrounds/grey-refinery.webp cpanel-deploy-optimized/public/backgrounds/ 2>/dev/null || true

# Copy package files
cp package.json cpanel-deploy-optimized/
cp package-lock.json cpanel-deploy-optimized/

echo "Calculating sizes..."
echo "Original public folder size:"
du -sh public
echo "Optimized public folder size:"
du -sh cpanel-deploy-optimized/public

# Create zip
echo "Creating optimized zip file..."
cd cpanel-deploy-optimized
zip -r ../cpanel-deploy-optimized.zip . -x "*.DS_Store" -x "*__MACOSX*"
cd ..

echo ""
echo "✅ Optimized deployment package created: cpanel-deploy-optimized.zip"
echo ""

# Show final size
echo "Final package size:"
ls -lh cpanel-deploy-optimized.zip

echo ""
echo "📦 Optimized Upload Instructions for cPanel:"
echo "============================================"
echo "1. Upload cpanel-deploy-optimized.zip to cPanel File Manager"
echo "2. Extract in your application root directory"
echo "3. Run: npm install --production"
echo "4. Restart Node.js app in cPanel"
echo ""
echo "Note: Large images are served from backend API, not included in this package"
echo "This should be around 74MB instead of 298MB"
