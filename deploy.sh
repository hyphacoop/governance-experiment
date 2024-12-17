#!/bin/bash
#
# This script deploys both the dashboard and the timeline apps to a clean "deploy" branch
#

set -e  # Exit immediately if any command fails

# Step 1: Build the apps
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

# Step 2: Prepare a clean deployment directory
echo "Preparing deployment directory..."
rm -rf gh-pages-temp
mkdir gh-pages-temp

# Step 3: Copy builds to the deployment directory (safely using rsync)
echo "Copying dashboard build to the root of the deploy branch..."
rsync -av --delete --exclude=".env" dashboard/dist/ gh-pages-temp/

echo "Copying timeline build to /timeline subdirectory..."
mkdir -p gh-pages-temp/timeline
rsync -av --delete --exclude=".env" timeline/dist/ gh-pages-temp/timeline/

# Step 4: Deploy to the deploy branch
echo "Deploying to deploy branch..."

# Fetch the deploy branch or create it if it doesn't exist
git fetch origin deploy || echo "No deploy branch exists yet."
if git show-ref --quiet refs/heads/deploy; then
    git checkout deploy
    git reset --hard origin/deploy
else
    git checkout --orphan deploy
fi

# Remove all tracked files to clean the branch
echo "Cleaning deploy branch..."
git rm -rf . > /dev/null

# Copy only the clean deployment files
echo "Copying deployment files to the deploy branch..."
rsync -av --delete gh-pages-temp/ .

# Step 5: Commit and push the changes
echo "Committing deployment files..."
git add --all
git commit -m "Deploy Svelte apps to GitHub Pages" || echo "No changes to commit."

echo "Pushing to deploy branch..."
git push origin deploy --force

# Step 6: Cleanup
echo "Cleaning up..."
rm -rf gh-pages-temp
git checkout main  # Switch back to your main branch

echo "Deployment complete! Your apps are live at:"
echo "https://hyphacoop.github.io/governance-experiment/"
echo "https://hyphacoop.github.io/governance-experiment/timeline/"
