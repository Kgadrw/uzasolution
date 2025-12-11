# Separate Backend and Frontend Repositories

## Current Setup

✅ **Backend .gitignore**: `backend/.gitignore` - Ignores backend-specific files
✅ **Frontend .gitignore**: Root `.gitignore` - Ignores frontend-specific files + `/backend/` folder

## How It Works

### Frontend Repository (Root)
- The root `.gitignore` excludes the `/backend/` folder
- Only frontend files are tracked
- Backend folder is completely ignored

### Backend Repository (Separate)
- The `backend/.gitignore` handles backend-specific ignores
- Can be initialized as a separate Git repository
- Independent from frontend

## Setup Instructions

### Option 1: Separate Git Repositories (Recommended)

#### Backend Repository Setup

```bash
# Navigate to backend folder
cd backend

# Initialize Git repository
git init

# Add all backend files
git add .

# Commit
git commit -m "Initial backend commit"

# Add remote repository
git remote add origin <your-backend-repo-url>

# Push to remote
git branch -M main
git push -u origin main
```

#### Frontend Repository Setup

```bash
# Navigate to root folder (frontend)
cd ..

# Initialize Git repository (if not already)
git init

# The root .gitignore already excludes /backend/
# Add all frontend files
git add .

# Commit
git commit -m "Initial frontend commit"

# Add remote repository
git remote add origin <your-frontend-repo-url>

# Push to remote
git branch -M main
git push -u origin main
```

### Option 2: Monorepo (Same Repository)

If you want both in the same repository:

1. **Remove `/backend/` from root `.gitignore`**
2. Both folders will be tracked in the same repo
3. Each has its own `.gitignore` for specific ignores

## File Structure

```
uzasolution/                    (Frontend Repository)
├── src/                       ✅ Tracked
├── public/                    ✅ Tracked
├── package.json               ✅ Tracked
├── .gitignore                 ✅ Tracked (excludes /backend/)
└── backend/                   ❌ NOT tracked (ignored)

backend/                       (Backend Repository - Separate)
├── src/                       ✅ Tracked
├── package.json               ✅ Tracked
├── .gitignore                 ✅ Tracked
└── ...                        ✅ Tracked
```

## Verification

### Check Frontend Repository
```bash
# From root directory
git status
# Should NOT show backend/ folder
```

### Check Backend Repository
```bash
# From backend directory
cd backend
git status
# Should only show backend files
```

## Benefits

✅ **Independent Version Control** - Backend and frontend can have different commit histories
✅ **Separate Deployments** - Deploy backend and frontend independently
✅ **Team Collaboration** - Different teams can work on each repo
✅ **Cleaner History** - No mixing of backend and frontend changes
✅ **Flexible** - Can still use as monorepo if needed

## Important Notes

1. **Environment Files**: Both `.gitignore` files exclude `.env` files for security
2. **Node Modules**: Both exclude `node_modules/` 
3. **Backend Logs**: Backend logs are in `backend/logs/` and are ignored
4. **Documentation**: Documentation files can be tracked or ignored based on your preference

## Quick Commands Reference

### Backend Repo
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin <backend-url>
git push -u origin main
```

### Frontend Repo
```bash
# From root
git init
git add .
git commit -m "Initial commit"
git remote add origin <frontend-url>
git push -u origin main
```

## Troubleshooting

**Backend folder showing in frontend repo?**
- Make sure `/backend/` is in root `.gitignore`
- Run: `git rm -r --cached backend/` (if already tracked)
- Commit the change

**Frontend files showing in backend repo?**
- Make sure backend `.gitignore` has frontend exclusions (commented out by default)
- Or use separate repositories completely

**Want to switch to monorepo?**
- Remove `/backend/` from root `.gitignore`
- Both will be tracked in the same repo

