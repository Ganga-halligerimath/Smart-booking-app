Smart Bookmark App

A Next.js + Supabase bookmark manager that allows users to sign in with Google, add bookmarks (URL + title), view them in real-time, and manage their private bookmarks.

Features

Google OAuth Login – Users can sign in with Google (no email/password required).

Add Bookmarks – Add URL + title to your personal bookmarks.

Private Bookmarks – Each user's bookmarks are private. User A cannot see User B's bookmarks.

Real-time Updates – Bookmark list updates automatically if added in another tab.

Delete Bookmarks – Remove your own bookmarks easily.

Bookmarklet Support – Add bookmarks directly from your browser via a bookmarklet.

Deployed on Vercel – Live URL: https://smart-booking-app-two.vercel.app

Tech Stack

Next.js (App Router / Client Components)

Supabase – Auth (Google OAuth) + Postgres database

React – useState, useEffect

Vercel – Deployment

Getting Started (Local Development)
1. Clone the repository
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app

2. Install dependencies
npm install
# or
yarn install

3. Create .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY


Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your Supabase project credentials.

4. Run the app locally
npm run dev
# or
yarn dev


Open http://localhost:3000
 to view it locally.

Deployment (Vercel)

Push your repo to GitHub.

Import the repo in Vercel.

Set environment variables in Vercel:

NEXT_PUBLIC_APP_URL=https://your-vercel-deployed-url.vercel.app
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY


Deploy the app.

Your app will be live at the Vercel URL.

API Endpoints
POST /api/bookmarklet

Add a bookmark via bookmarklet or fetch request.

Request Body

{
  "title": "Page Title",
  "url": "https://example.com",
  "user_id": "USER_ID_FROM_SESSION"
}


Response

{
  "data": {
    "id": "bookmark_id",
    "title": "Page Title",
    "url": "https://example.com",
    "user_id": "USER_ID_FROM_SESSION",
    "created_at":
