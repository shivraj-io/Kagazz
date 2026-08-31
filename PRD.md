# PRD.md — Print Shop Management & Online Printing System

## 1. Product Summary
A digital ordering and queue-management system for a local stationery/printing shop.

Main audience:
- college/school students
- office/general customers
- art/craft customers

Core value:
Students submit structured print jobs digitally and collect them when ready. The shopkeeper receives the document, requirements, customer information and payment status in one order workflow.

## 2. Problem
Local printing workflows may depend on WhatsApp, verbal instructions and physical queues, causing:
- unclear print requirements
- repeated messages
- manual order handling
- waiting at the shop
- difficulty tracking status

## 3. Users

### Customer
Uploads and configures print jobs and tracks orders.

### Admin/Shopkeeper
Receives, processes, prints and completes orders.

### Employee
Later supports printing, attendance and salary workflows.

## 4. Customer Workflow

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
Track Status
        |
Ready Notification
        |
Collect
```

## 5. Customer Requirements

### Authentication
- Google OAuth before final order confirmation.
- First-time users provide mobile number.
- Mobile number is OTP verified.
- Store phone and verification state.
- Store WhatsApp/SMS consent where applicable.

### Documents
- PDF and JPEG only.
- Maximum 5 JPEG photos per request.
- Server-side file validation.
- Actual files stored in private Amazon S3.
- PostgreSQL stores metadata/S3 references.

### Print Options
- B/W or Color
- number of copies
- single side / both sides
- Spiral / Hard / Tape binding
- School / College / Office-General / Art-Craft
- paper/file selection

### Pricing
- backend calculates price
- user sees price before confirmation
- pricing rules must not live only in frontend

### Payment
- Pay at Shop
- Online via Razorpay

### Orders
- order/reference ID
- order details
- payment status
- order status
- ready notification

## 6. Admin Requirements
- authenticated admin
- server-side role authorization
- view incoming orders
- view customer contact
- view print configuration
- access private documents through authorized temporary S3 URLs
- update:
  - Received
  - Printing
  - Ready
  - Completed

## 7. Notifications
Initial:
- order status page
- polling if needed

Later:
- web notification
- WhatsApp
- SMS

When Ready, notification should contain:
- order ID
- ready status
- collection information
- relevant payment information

Notification failure must not corrupt order state.

## 8. File Privacy & Retention
- S3 bucket private.
- Short-lived pre-signed URLs.
- Recommended retention: delete print file 24 hours after order completion.
- Keep order/payment history after file deletion.
- Never store PDF/JPEG binaries in PostgreSQL.

## 9. Later Shop Operations

### Inventory
- stock update
- stock transactions
- minimum stock
- low-stock status
- supplier bills
- reorder PDF

### Employees
- employee records
- attendance
- salary

### Future
- home delivery
- multiple branches
- advanced analytics
- automatic stock deduction
- automatic printer integration

## 10. Non-Functional Requirements
- mobile-first customer UX
- responsive upload flow
- secure authentication
- server-side authorization
- private customer documents
- reliable payment state
- reliable order state
- low operating cost
- maintainable modular monolith
- avoid unnecessary third-party services

## 11. Technical Constraints
- Next.js + TypeScript
- Tailwind CSS + shadcn/ui
- Node.js + Express + TypeScript
- Supabase PostgreSQL
- Prisma
- Amazon S3
- Google OAuth
- Zod
- pdf-lib / pdf-parse
- Razorpay
- Vercel for frontend and backend

## 12. Initial Out of Scope
- home delivery
- automatic printer integration
- multi-branch
- advanced analytics
- coupons
- automated stock deduction
- advanced payroll
- WhatsApp/SMS in validation MVP
- complex realtime infrastructure
- microservices

## 13. Open Questions
1. `70 PDFs/day`: per order, per user/day or shop-wide/day?
2. `PDF max = 40`: does 40 mean 40 MB per PDF?
3. Do JPEGs have the same size limit?
4. Exact paper/file options?
5. Exact pricing formula?
6. Multi-page PDF page-count rules?
7. Automatic page counting for every PDF?
8. Exact OTP provider?
9. Exact WhatsApp/SMS provider?
10. Exact admin/employee permission model?
11. Exact Vercel production/commercial plan?
12. Exact S3 retention duration? Current recommendation is 24 hours.

## 14. MVP Success Criteria
The MVP succeeds if:
- students complete print orders through the website
- students repeat orders
- shopkeeper processes orders without confusion
- WhatsApp/manual handling decreases
- shopkeeper saves measurable time

Primary metric:
**successful repeat print orders through the system.**

## 15. Product Principle
Do not measure MVP quality by feature count.

The core product is:
**digital print-order submission + structured shopkeeper queue + reliable completion/collection workflow.**
