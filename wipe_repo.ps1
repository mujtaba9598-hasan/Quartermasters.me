# wipe_repo.ps1
# CAUTION: This script completely resets the local git history and force pushes the current state as a fresh initial commit.

$ErrorActionPreference = "Stop"

Write-Host "WARNING: This will delete the .git folder and re-initialize the repository." -ForegroundColor Red
Write-Host "This action is destructive and will rewrite history." -ForegroundColor Yellow

# 1. Remove existing .git folder
if (Test-Path ".git") {
    Write-Host "Removing .git directory..."
    Remove-Item -Path ".git" -Recurse -Force
}

# 2. Initialize new git repo
Write-Host "Initializing new git repository..."
git init

# 3. Add all files
Write-Host "Adding files..."
git add .

# 4. Commit
Write-Host "Committing..."
git commit -m "Initial commit: Quartermasters Nexus v2.1 (Clean Build)"

# 5. Add Remote (User will need to confirm URL or it will be prompted)
# Assuming origin is: https://github.com/mujtaba9598-hasan/Quartermasters.me
$remoteUrl = "https://github.com/mujtaba9598-hasan/Quartermasters.me"
Write-Host "Adding remote origin: $remoteUrl"
git remote add origin $remoteUrl

# 6. Force Push
Write-Host "Force pushing to main..."
git branch -M main
git push -u origin main --force

Write-Host "Repository wipe and fresh push complete." -ForegroundColor Green
