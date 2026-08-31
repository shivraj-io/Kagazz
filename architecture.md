# architecture.md — Print Shop System

## 1. Goal
A low-cost, maintainable modular monolith for a local stationery/printing shop.

Primary sides:
- Customer: upload, configure, price, authenticate, pay, track.
- Admin/shopkeeper: receive, process, print, complete.
- Later: inventory, bills, employees, attendance, salary.

## 2. High-Level Architecture

```text
Customer/Admin Browser
        |
        v
+--------------------------------+
|             Vercel             |
|                                |
| Next.js + TypeScript           |
| Express + TypeScript API       |
+---------------+----------------+
                |
       +--------+---------+
       |                  |
       v                  v
+--------------+   +----------------+
| Supabase     |   | Amazon S3      |
| PostgreSQL   |   | Private Bucket |
|              |   |                |
| users        |   | PDFs / JPEGs   |
| orders       |   |                |
| payments     |   +----------------+
| notifications|
| later: ops   |
+--------------+
       |
   +---+---------+
   |             |
   v             v
Google OAuth   Razorpay
```

## 3. Deployment
- Frontend: Vercel.
- Express backend: Vercel-supported serverless/Fluid Compute deployment.
- Database: Supabase PostgreSQL.
- Files: Amazon S3.
- Do not add Render unless a concrete Vercel backend limitation requires it.

## 4. Frontend
Next.js + TypeScript.
UI: Tailwind CSS + shadcn/ui.

Customer areas:
- home
- choose service/category
- upload
- configure
- price/review
- Google login
- mobile OTP
- payment
- order confirmation
- order status
- later order history/notifications

Admin areas:
- dashboard
- orders
- order details
- later inventory, bills, employees, attendance, salary

## 5. Backend
Node.js + Express + TypeScript.

Modules:
- auth
- users
- orders
- documents
- pricing
- payments
- notifications
- inventory (Phase 2)
- supplier-bills (Phase 2)
- employees (Phase 2)
- attendance (Phase 2)
- salary (Phase 2)

Preferred flow:
`route -> controller -> service -> Prisma`

## 6. Database
Supabase PostgreSQL is the only application database.
Prisma is the ORM.

Core:
- users
- orders
- order_documents
- print_configurations
- payments
- notifications

Later:
- inventory_items
- stock_transactions
- supplier_bills
- employees
- attendance
- salary

## 7. S3 Document Storage
Actual PDF/JPEG content lives only in S3.

PostgreSQL stores:
- order_id
- file_name
- s3_key
- mime_type
- file_size
- page_count
- timestamps

### Upload

```text
Browser
  -> Express: request upload authorization
  -> Express validates user/order/file
  -> pre-signed S3 URL
  -> Browser uploads directly to S3
```

### Admin access

```text
Admin
  -> Express authorization
  -> short-lived pre-signed S3 URL
  -> S3 object
```

Never make the bucket public.

## 8. Retention
Recommended:
`COMPLETED -> 24 hours -> delete print file`

Prefer S3 lifecycle rules where practical.

Retain order/payment history after file deletion.

## 9. Authentication & Mobile
Google OAuth identifies the customer.

Google authentication does not reliably provide the mobile number needed for shop contact/WhatsApp/SMS.

First-time flow:
`Google login -> mobile number -> OTP verification -> review/confirm`

Store:
- google_id
- name
- email
- phone
- phone_verified
- notification consent fields

## 10. Customer Workflow

```text
Choose service/category
        |
Upload PDF/JPEG
        |
Configure print
        |
See price
        |
Google Login
        |
Mobile + OTP
        |
Review Order
        |
Pay at Shop / Online
        |
Order Confirmed
        |
RECEIVED
        |
PRINTING
        |
READY
        |
Notification
        |
COMPLETED
```

## 11. Order State
Initial:
`RECEIVED -> PRINTING -> READY -> COMPLETED`

Cancellation/failure states must be explicitly defined before implementation.

## 12. Pricing
Backend owns pricing logic.
Potential inputs:
- B/W/Color
- copies
- single/double side
- binding
- paper/file
- category/service

Do not hardcode pricing in UI.

## 13. Payments
Pay at Shop:
`order -> payment pending -> shop confirms payment`

Online:
`order -> Razorpay -> backend verification/webhook -> payment paid`

Frontend payment success alone is not authoritative.

## 14. Notifications
Initial MVP:
- order status page
- polling if needed

Real-time web notifications:
- add only when required
- do not assume Socket.IO is required on Vercel

Phase 2:
- WhatsApp Business API
- SMS provider

Notification failure must not corrupt order state.

## 15. Security
- private S3
- short-lived signed URLs
- backend authorization
- Google OAuth
- OTP verification
- server-side validation
- payment webhook verification
- no secrets in browser
- appropriate rate limiting
- DB constraints/transactions

## 16. Scaling
For one shop:
- modular monolith
- one Supabase PostgreSQL project
- one S3 bucket
- Vercel deployment

Scale only when actual usage requires it.
