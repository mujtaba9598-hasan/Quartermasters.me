# restore_repo.ps1
# This script re-stages all local files and pushes them to the remote repository.

$ErrorActionPreference = "Stop"

Write-Host "Restoring full repository content..." -ForegroundColor Cyan

# 1. Add all files (current state of local machine)
Write-Host "Adding all files..."
git add .

# 2. Commit
Write-Host "Committing..."
git commit -m "Restore: Full application code v2.1 (Production Ready)"

# 3. Push
Write-Host "Pushing to remote..."
git push -u origin main --force

Write-Host "Success! Full website code pushed to GitHub." -ForegroundColor Green
