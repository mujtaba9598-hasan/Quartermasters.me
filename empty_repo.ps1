# empty_repo.ps1
# CAUTION: This script removes all files from the remote repository (Git staging)
# but keeps them on your local machine.

$ErrorActionPreference = "Stop"

Write-Host "WARNING: This will remove ALL files from the Git repository (remote)." -ForegroundColor Red
Write-Host "Your local files will remain safe on your disk." -ForegroundColor Green
Write-Host "The GitHub repository will only contain README.md after this." -ForegroundColor Yellow

# 1. Remove everything from git index (cached), but keep local files
Write-Host "Unstaging all files (keeping local copies)..."
git rm -r --cached .

# 2. Add back only README.md
if (Test-Path "README.md") {
    Write-Host "Adding README.md..."
    git add README.md
}
else {
    Write-Host "Creating placeholder README.md..."
    "Quartermasters Nexus - Private Repo" | Out-File -Encoding utf8 "README.md"
    git add README.md
}

# 3. Commit the "Emptying"
Write-Host "Committing empty state..."
git commit -m "Reset repository: Removed all source code from remote tracking."

# 4. Force Push
Write-Host "Force pushing to remote..."
git push -u origin main --force

Write-Host "Remote repository emptied. Local files are safe." -ForegroundColor Green
