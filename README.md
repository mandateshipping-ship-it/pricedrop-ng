# PriceDrop NG - Production Migration

## Next.js 14 + TypeScript + Firebase

This is the production-ready architecture for PriceDrop NG.

### Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Firebase (Auth + Firestore + Storage + Cloud Functions)
- **Authentication**: Firebase Phone Auth (OTP)
- **Real-time**: Firestore `onSnapshot`
- **Hosting**: Vercel + Firebase
- **Payments**: Paystack / Flutterwave (via Cloud Functions)

### Project Structure

```
price-drop-ng/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── watchlist/
│   │   ├── my-devices/
│   │   └── notifications/
│   ├── (marketplace)/
│   │   ├── products/[id]/
│   │   ├── technicians/[id]/
│   │   └── swap/
│   ├── admin/
│   │   └── dashboard/
│   ├── api/
│   │   └── recommendations/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── ProductCard.tsx
│   ├── TechnicianCard.tsx
│   ├── RecommendationSection.tsx
│   ├── WatchlistButton.tsx
│   └── ReportScamButton.tsx
├── lib/
│   ├── firebase.ts
│   ├── firestore.ts
│   ├── auth.ts
│   ├── recommendations.ts
│   └── types.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useWatchlist.ts
│   └── useNotifications.ts
├── types/
│   └── index.ts
├── middleware.ts
└── package.json
```

### Key Firebase Collections

```ts
// Firestore Collections
users/
products/
listings/
technicians/
services/
technicianReviews/
watchlists/
notifications/
priceHistory/
userDevices/
referrals/
rewards/
repairRequests/
```

### Authentication Flow

- Phone number + OTP (Firebase Auth)
- Role-based access (buyer / seller / technician / admin)

### Real-time Features

- Watchlist price updates
- New notifications
- Live recommendation refreshes (optional)
- Repair request status updates

---

## Getting Started

```bash
npx create-next-app@latest price-drop-ng --yes --tailwind --eslint --yes
cd price-drop-ng
npm install firebase lucide-react date-fns
```

Then copy the structure from this folder.

---

**This folder contains the production migration starter.**