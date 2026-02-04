# Email Rate Limit Solution Guide

## Problem
When signing up, you get: **"Email rate limit exceeded"** or **"Too many requests"**

This is a Supabase protection feature to prevent abuse.

---

## Solutions (Pick One)

### ✅ Solution 1: Use Different Email Addresses (Easiest)
Simply use a different email for each signup test:
- test1@example.com
- test2@example.com
- test3@example.com
- test123@domain.com
- etc.

**Best for:** Quick testing during development

---

### ✅ Solution 2: Wait 1 Hour
Rate limits reset after approximately **1 hour**.
- If you hit the limit at 2:00 PM, try again at 3:00 PM

**Best for:** Patience-based testing

---

### ✅ Solution 3: Disable Email Verification (Recommended for Dev)

#### In Supabase Dashboard:
1. Go to **Authentication** → **Providers** → **Email**
2. Turn **OFF** → "Confirm email"
3. Save changes

#### Now:
- Users can signup immediately without email verification
- Perfect for development and testing
- No rate limit issues

**Best for:** Development and testing environment

---

### ✅ Solution 4: Use Temporary Email Services

Services like:
- **10minutemail.com** - 10 minute temporary emails
- **tempmail.io** - Instant temporary emails
- **guerrillamail.com** - Disposable emails
- **mailtrap.io** - Catch all test emails

Each one gives you a new email, bypassing the rate limit.

**Best for:** Testing without waiting

---

## What's Happening?

Supabase Auth enforces rate limits to prevent:
- Email spam/abuse
- Account enumeration attacks
- DDoS attempts via email

Default limits (free tier):
- ~1 signup email per email address per hour
- ~5 password resets per email per hour

---

## Recommended Action

For **this hackathon/development**:

1. **Option A (Quick):** Disable email verification in Supabase settings
2. **Option B (No Setup):** Use different test emails (test1@, test2@, etc.)
3. **Option C (Fallback):** Use temporary email service

---

## Test Credentials

Once you get past signup, you can test with:
```
Email: any-unique-email@domain.com
Password: SecurePassword123!
```

---

## Need Help?

Check Supabase Dashboard:
1. **Auth** → **Users** - See all registered users
2. **Auth** → **Logs** - See signup attempts and errors
3. **Auth** → **Providers** - Adjust email settings
