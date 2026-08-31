# Technology Stack & Architecture Rules — AWS

## Locked
- Next.js + TypeScript
- Tailwind CSS + shadcn/ui
- Node.js + Express + TypeScript
- Amazon RDS PostgreSQL
- Prisma
- Amazon S3
- Google OAuth
- Zod
- pdf-lib / pdf-parse
- Razorpay

## Later / Conditional
- Socket.IO — when real-time web notifications are needed
- WhatsApp Business Cloud API — Phase 2
- MSG91 or approved SMS provider — Phase 2
- Redis + BullMQ — only for justified background/retry/scheduled workloads
- PDFKit — Phase 2 reorder PDFs
- Swagger/OpenAPI — recommended as API grows

## Data
RDS stores relational metadata/business data. S3 stores actual PDFs/JPEGs. Never store document binaries in PostgreSQL.

## S3 Security
Private bucket. Use short-lived pre-signed URLs. Do not expose public predictable document URLs.

## Retention
Recommended: delete print files 24 hours after order completion; retain non-file order history.

## Architecture
Modular monolith:
Next.js -> REST -> Node/Express -> Prisma -> RDS PostgreSQL
Node/Express -> private S3
Node/Express -> Razorpay
Node/Express -> notifications as phases require

## AI/Codex Rule
Do not add or replace technology without approval. If a new technology is genuinely needed, explain why, current limitation, alternatives, cost, architectural impact, and wait for approval.
