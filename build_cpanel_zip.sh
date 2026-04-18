#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building Next.js application..."
npm run build

echo "Packaging for cPanel deployment..."
zip -r asedo-frontend-cpanel-deploy.zip .next public package.json package-lock.json server.js .env.production next.config.ts

echo "Done! The zip file has been created."
