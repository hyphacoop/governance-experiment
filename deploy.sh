#!/bin/bash
#
# This script deploys both the dashboard and the timeline apps to a clean "deploy" branch
#
set -e  # Exit immediately on error

# Step 1: Ensure we are on main and prepare to switch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️ ERROR: You must run this script from the 'main' branch."
    exit 1
fi

# Step 2: Build the apps
echo "Building dashboard app..."
cd dashboard
npm install --silent
npm run build
cd ..

echo "Building timeline app..."
cd timeline
npm install --silent
npm run build
cd ..

echo "Copying timeline build to dashboard/dist/timeline..."
mkdir dashboard/dist/timeline
cp -r timeline/dist/* dashboard/dist/timeline/

echo "Deploying to Github pages..."
cd dashboard
npm run deploy

echo "✅ Web apps have been successfully built and deployed!🏗️📦🌐 Visit them at:"
echo "https://hyphacoop.github.io/governance-experiment/"
echo "https://hyphacoop.github.io/governance-experiment/timeline/"
