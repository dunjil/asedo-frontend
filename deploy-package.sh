#!/bin/bash

echo "Creating deployment package for cPanel..."

# Clean up old deployment files
rm -rf deploy
rm -f deploy.zip

# Create deploy directory
mkdir -p deploy

# Copy the standalone server files
echo "Copying standalone server..."
cp -r .next/standalone/* deploy/

# Copy server.js to the root
echo "Copying custom server.js..."
cp server.js deploy/

# Copy .env.production
echo "Copying environment config..."
cp .env.production deploy/.env.production

# Create zip file
echo "Creating zip archive..."
cd deploy
zip -r ../deploy.zip . -x "*.DS_Store" -x "*__MACOSX*"
cd ..

echo ""
echo "✓ Deployment package created: deploy.zip"
echo ""
echo "Upload instructions:"
echo "1. Upload deploy.zip to your cPanel File Manager at /home/asedrupq/new.asedoenergygroup.com/"
echo "2. Extract the zip file in cPanel"
echo "3. Make sure your .htaccess file is in place"
echo "4. Restart the Node.js app in cPanel"
echo ""
echo "Important: The directory structure should be:"
echo "  /home/asedrupq/new.asedoenergygroup.com/"
echo "    ├── server.js"
echo "    ├── .env.production"
echo "    ├── frontend/"
echo "    │   ├── server.js (from standalone)"
echo "    │   ├── .next/"
echo "    │   │   └── static/"
echo "    │   └── public/"
echo "    └── node_modules/"
