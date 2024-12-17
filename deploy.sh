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

# Step 3: Prepare deployment directory
echo "Preparing deployment directory..."
rm -rf deploy-temp
mkdir deploy-temp

echo "Copying dashboard build to root of deploy..."
cp -r dashboard/dist/* deploy-temp/

echo "Copying timeline build to /timeline..."
mkdir -p deploy-temp/timeline
cp -r timeline/dist/* deploy-temp/timeline/

# Step 4: Create a clean deploy branch
echo "Creating a clean deploy branch..."

# Delete local deploy branch if it exists
if git show-ref --quiet refs/heads/deploy; then
    echo "Deleting existing local 'deploy' branch..."
    git branch -D deploy
fi

# Switch to a completely clean orphan branch
git checkout --orphan deploy
git rm -rf . > /dev/null  # Remove all tracked files in this new branch

# Step 5: Copy deployment files
echo "Copying new build files into the deploy branch..."
cp -r deploy-temp/* .

# Step 6: Ensure we're on deploy branch before committing
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "deploy" ]; then
    echo "❌ ERROR: Not on 'deploy' branch! Aborting commit."
    exit 1
fi

# Step 7: Commit and push
echo "Committing and pushing to deploy branch..."
git add --all
git commit -m "Deploy Svelte apps to GitHub Pages"
git push origin deploy --force

# Step 8: Cleanup and return to main
echo "Cleaning up deployment artifacts..."
rm -rf deploy-temp
git checkout main

echo "✅ Deployment successful! Your apps are live at:"
echo "https://hyphacoop.github.io/governance-experiment/"
echo "https://hyphacoop.github.io/governance-experiment/timeline/"
