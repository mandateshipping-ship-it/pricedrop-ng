# PriceDrop NG - Complete Deployment Guide

## 1. Firebase Project Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it `pricedrop-ng` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click **Create project**

### Step 2: Enable Required Services
In Firebase Console:
- **Authentication** → Sign-in method → Enable **Phone**
- **Firestore Database** → Create database (Start in **production mode**)
- **Storage** → Get started

### Step 3: Get Firebase Config
1. Go to Project Settings (gear icon)
2. Under "Your apps" → Add Web App
3. Copy the `firebaseConfig` object
4. Create `.env.local` file in your project root and paste the values

### Step 4: Set up Admin User (Important)
After creating your first user, go to:
**Firestore → users collection → Edit your user document**
Add this field:
```json
{
  "role": "admin"
}
```

Or better: Use **Custom Claims** via Cloud Functions (recommended for production).

---

## 2. Deploy Cloud Functions

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize Functions
```bash
cd functions
firebase init functions
```

Choose:
- TypeScript
- ESLint (yes)
- Install dependencies (yes)

### Step 3: Deploy Functions
```bash
firebase deploy --only functions
```

Your Cloud Functions (`onListingPriceUpdate` and `onNewRepairRequest`) will now run automatically.

---

## 3. Payment Integration (Paystack / Flutterwave)

### Paystack Integration (Recommended for Nigeria)

Update `app/(marketplace)/payments/boost/page.tsx`:

```tsx
// Add this function
const initializePayment = async () => {
  setLoading(true);
  
  const response = await fetch('/api/paystack/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: user.email,
      amount: plans[selectedPlan].price * 100, // Paystack uses kobo
      metadata: {
        plan: selectedPlan,
        userId: user.uid
      }
    })
  });

  const data = await response.json();
  
  if (data.authorization_url) {
    window.location.href = data.authorization_url;
  }
};
```

Create `app/api/paystack/initialize/route.ts` for server-side verification.

### Flutterwave Alternative
Similar flow using their SDK.

---

## 4. Deploy to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial PriceDrop NG production build"
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Add all environment variables from `.env.example`
5. Click **Deploy**

Vercel will automatically deploy your app.

### Step 3: Add Custom Domain (Optional)
In Vercel dashboard → Settings → Domains

---

## 5. Final Security Checklist

- [ ] Firebase Security Rules deployed (`firestore.rules`)
- [ ] Admin role properly set using Custom Claims
- [ ] Environment variables added in Vercel
- [ ] Cloud Functions deployed
- [ ] Payment webhooks configured (Paystack/Flutterwave)
- [ ] reCAPTCHA enabled for Phone Auth (production)

---

**Your PriceDrop NG platform is now ready for real users!**

Need help with any specific step? Let me know.