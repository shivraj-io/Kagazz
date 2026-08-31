# design.md — UI/UX Design System

## 1. Design Goal

The product must look like a professionally designed real-world
print ordering platform.

The UI must NOT look AI-generated, template-generated, or like a
generic SaaS dashboard.

Priorities:

1. Usability
2. Clarity
3. Speed
4. Consistency
5. Visual quality
6. Decoration

The design should be modern but restrained.

---

## 2. Design Reference

Google Stitch may be used during the design exploration phase.

Stitch output is a VISUAL REFERENCE ONLY.

Do NOT copy Stitch-generated code into the production application.

Production implementation must use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

The approved Stitch design direction should be translated into
the existing project architecture.

Stitch must not introduce:

- new frontend frameworks
- new UI libraries
- new architectural patterns
- new dependencies

unless explicitly approved.

---

## 3. Design Exploration Process

Before implementing the complete frontend:

1. Explore visual directions in Google Stitch.
2. Create only the core screens initially:
   - Home
   - Upload
   - Configure
   - Order Summary
3. Compare visual directions.
4. Select one design direction.
5. Use the selected direction as the visual reference.
6. Implement the design using the project's existing frontend stack.
7. Extend the same design language to the remaining screens.

Do not generate the entire application during the exploration phase.

---

## 4. Core UX Flow

Customer flow:

Upload
↓
Configure
↓
See Price
↓
Google Login
↓
Mobile OTP
↓
Review Order
↓
Payment
↓
Order Confirmation
↓
Track Order
↓
Ready
↓
Collect

This flow should remain simple and predictable.

---

## 5. Visual Language

The interface should feel:

- modern
- practical
- trustworthy
- student-friendly
- professional
- approachable

Avoid making it:

- overly futuristic
- overly corporate
- overly playful
- overly decorative

---

## 6. AI-Generated UI Restrictions

Strictly avoid:

- excessive gradients
- purple/blue AI aesthetics
- glassmorphism
- glowing elements
- gradient blobs
- excessive rounded cards
- excessive shadows
- cards inside cards
- oversized hero sections
- huge typography
- unnecessary illustrations
- decorative 3D elements
- fake statistics
- fake testimonials
- excessive animation
- unnecessary charts
- excessive icons

The interface should appear intentionally designed rather than
automatically generated.

---

## 7. Layout Philosophy

Do not put every section inside a card.

Prefer:

- whitespace
- typography
- alignment
- subtle borders
- section grouping
- restrained surfaces

Cards should only be used when they improve information grouping.

---

## 8. Customer Design

Customer UI is mobile-first.

The main goal is fast order completion.

Primary screens:

- Home
- Upload
- Configure
- Price
- Authentication
- Review
- Payment
- Confirmation
- Tracking

Important actions must be thumb-friendly.

---

## 9. Admin Design

Admin UI is operational rather than decorative.

Priorities:

- information density
- fast scanning
- clear status
- obvious actions
- efficient order processing

Admin should not look like an analytics-heavy SaaS dashboard.

---

## 10. Responsive Design

Customer:
Mobile-first.

Admin:
Desktop-first with responsive support.

Do not simply shrink desktop layouts for mobile.

Create intentional responsive layouts.

---

## 11. Typography

Typography must prioritize readability.

Use a limited number of:

- font sizes
- font weights
- heading levels

Avoid oversized typography unless it has a clear purpose.

---

## 12. Color

Use a restrained color system:

- primary brand color
- neutral background
- neutral surfaces
- success
- warning
- error

Do not use gradients as the primary visual identity.

Color should communicate hierarchy and state.

---

## 13. Components

Use reusable components where repetition exists.

Examples:

- Button
- Input
- FileUpload
- FileList
- PrintOption
- QuantitySelector
- PriceSummary
- OrderSummary
- StatusBadge
- OrderTimeline
- OrderCard
- OrderTable
- FilterBar
- EmptyState
- LoadingState
- ErrorState

Do not over-abstract components.

---

## 14. States

Every important interaction must support:

- loading
- success
- error
- empty
- disabled
- processing

Errors must explain what happened and how the user can recover.

---

## 15. Animation

Animation should be subtle and functional.

Allowed:

- upload progress
- loading
- subtle transitions
- status changes
- toast notifications

Avoid decorative motion.

---

## 16. Accessibility

Follow:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible contrast
- proper labels
- adequate touch targets
- accessible form errors

Do not rely only on color to communicate state.

---

## 17. Design Consistency Rule

Every new screen must look like it belongs to the same product.

Before adding a new visual pattern, ask:

"Does this already exist in the design system?"

If yes, reuse it.

If no, introduce a new pattern only when there is a genuine UX reason.

---

## 18. Implementation Rule

Codex must treat this file as the UI/UX source of truth.

Codex must not:

- invent new visual styles
- introduce random UI patterns
- add unnecessary animations
- introduce new UI libraries
- copy generated Stitch code
- redesign approved screens without reason

If a requirement is missing, do not invent it.
Ask for clarification or follow the existing PRD.

---

## 19. Design Approval

The following screens must establish the visual language before
implementing the rest of the application:

1. Home
2. Upload
3. Configure
4. Order Summary

Once approved, the same visual language should be extended to:

- Authentication
- OTP
- Payment
- Confirmation
- Tracking
- Admin
