# Supabase OAuth Configuration

## Important: Configure Redirect URLs

After deploying to Vercel, you MUST add your production URL to Supabase's allowed redirect URLs:

### Steps:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `spmangcphuipbxzvcgpp`
3. Navigate to: **Authentication** → **URL Configuration**
4. Under **Redirect URLs**, add these URLs:
   - `https://smart-book-app-nine.vercel.app/dashboard`
   - `https://smart-book-app-nine.vercel.app/**` (wildcard for all routes)
   - `http://localhost:3000/dashboard` (for local development)

5. Under **Site URL**, set:
   - `https://smart-book-app-nine.vercel.app`

6. Click **Save**

### Why this is needed:
Supabase OAuth requires you to explicitly whitelist redirect URLs for security. Without this, authentication will fail or redirect to localhost.

### Current Production URL:
`https://smart-book-app-nine.vercel.app`
