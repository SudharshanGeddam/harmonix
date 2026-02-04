# Authentication & API Integration Guide

## Setup Steps

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# API Configuration (Backend Server)
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 2. Start the Backend Server
Make sure your FastAPI backend is running:
```bash
# In your backend directory
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Start the Next.js Frontend
```bash
npm run dev
```

## Troubleshooting

### "Network request failed" Error
If you see this error when accessing the dashboard:

1. **Check if backend is running**
   - Open http://127.0.0.1:8000/docs in your browser
   - You should see the FastAPI swagger UI
   - If not, the backend server isn't running

2. **Check browser console**
   - The console now logs the exact API URL being called
   - Look for messages like `[API] GET http://127.0.0.1:8000/api/dashboard/metrics`

3. **Check CORS configuration**
   - Your backend should allow requests from http://localhost:3000
   - Add to your FastAPI app:
   ```python
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

4. **Verify API endpoints exist**
   - GET `/api/dashboard/metrics`
   - GET `/api/packages`
   - GET `/api/receipts`

## Features Implemented

✅ **Authentication**
- Login page with email/password
- Signup support
- Session persistence
- Logout button in navbar
- Protected routes (redirects unauthenticated users to /login)

✅ **API Client** (src/lib/api.ts)
- Centralized API communication
- Typed responses
- Error handling with descriptive messages
- Automatic logging for debugging

✅ **Data Integration**
- Dashboard metrics (getDashboardMetrics)
- Package tracking (getPackages)
- Receipt management (getReceipts)
- Loading states and error handling on all pages

## File Structure

```
src/
├── lib/
│   ├── supabaseClient.ts       # Supabase initialization
│   ├── AuthProvider.tsx         # Auth state management
│   ├── LayoutContent.tsx        # Conditional layout rendering
│   └── api.ts                   # API client
├── app/
│   ├── login/page.tsx          # Login page
│   ├── layout.tsx              # Root layout with auth
│   ├── page.tsx                # Dashboard (real data)
│   ├── tracker/page.tsx        # Package tracker (real data)
│   └── receipts/page.tsx       # Receipts page (real data)
└── components/
    └── Navbar.tsx              # With logout button
```
