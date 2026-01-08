#!/bin/bash

echo "Creating cPanel deployment package..."

# Clean up
rm -rf cpanel-deploy
rm -f cpanel-deploy.zip

# Create deployment directory
mkdir -p cpanel-deploy

# Copy essential files
echo "Copying server.js..."
cp server.js cpanel-deploy/

echo "Copying .env.production..."
cp .env.production cpanel-deploy/

echo "Copying .next build folder..."
cp -r .next cpanel-deploy/

echo "Copying public folder..."
cp -r public cpanel-deploy/

echo "Copying package files..."
cp package.json cpanel-deploy/
cp package-lock.json cpanel-deploy/

# Create zip
echo "Creating zip file..."
cd cpanel-deploy
zip -r ../cpanel-deploy.zip . -x "*.DS_Store" -x "*__MACOSX*"
cd ..

echo ""
echo "✅ Deployment package created: cpanel-deploy.zip"
echo ""
echo "📦 Upload Instructions for cPanel:"
echo "=================================="
echo "1. Go to cPanel File Manager"
echo "2. Navigate to: /home/asedrupq/new.asedoenergygroup.com/"
echo "3. Delete OLD files (keep .htaccess and node_modules if you want)"
echo "4. Upload cpanel-deploy.zip"
echo "5. Extract the zip file"
echo "6. In cPanel Terminal, run: cd /home/asedrupq/new.asedoenergygroup.com && npm install --production"
echo "7. Go to Setup Node.js App and click 'Restart'"
echo ""
echo "Your app should now work at https://new.asedoenergygroup.com"
