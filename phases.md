# phases.md — Implementation Roadmap

## Phase 0 — Validation MVP

### Goal
Prove students will use the system instead of WhatsApp/manual handling.

### Build
- Next.js customer UI
- Express API on Vercel
- Supabase PostgreSQL
- Prisma
- private S3
- Google OAuth
- mobile number + OTP
- PDF/JPEG upload
- print configuration
- price calculation
- Pay at Shop
- admin order queue
- manual printing
- order status
- basic order status page

### Do NOT build
- Razorpay
- WhatsApp
- SMS
- inventory
- supplier bills
- employees
- attendance
- salary
- home delivery
- automatic printer integration
- Redis/BullMQ
- complex realtime infrastructure

### Validate
- completed orders
- repeat orders
- abandonment
- shopkeeper processing time
- manual/WhatsApp orders replaced

## Phase 1 — Production MVP
Add:
- Razorpay online payments
- server-side payment verification/webhooks
- production security hardening
- S3 pre-signed upload/download
- S3 retention/lifecycle deletion
- robust validation/error handling
- logging
- responsive production UI
- deployment configuration
- testing
- basic status polling/web notification

Optional:
- real-time web notification only if polling is insufficient

## Phase 2 — Shop Operations
Inventory:
- stock updates
- stock transactions
- minimum stock
- low-stock tracking
- supplier bills
- reorder PDF

Employees:
- profiles
- attendance
- salary

Notifications:
- WhatsApp Business API
- SMS provider
- notification logs
- preferences/consent

## Phase 3 — Growth
Only after real usage:
- automatic stock deduction
- repeat orders
- improved order history
- analytics
- coupons
- home delivery
- multi-shop/branch
- advanced payroll
- advanced reporting
- automatic printer integration

## Phase Rules
1. Do not build later-phase features early unless needed for validation.
2. Validate each phase with real users before expanding.
3. Do not add infrastructure just because it is popular.
4. Keep modular monolith.
5. Keep actual files in S3, not PostgreSQL.
6. Prefer simple polling before realtime infrastructure.
7. New technologies require `.codexrules` approval flow.

## Suggested Solo-Dev Sequence
### Week 1
- repo/project setup
- design system
- Google auth
- DB schema
- S3 upload

### Week 2
- print configuration
- pricing
- order creation
- admin queue

### Week 3
- order status
- mobile OTP
- Pay at Shop
- validation/security
- deployment
- real-shop testing

After validation:
- Razorpay
- notifications
- operational modules only when justified
