import { randomUUID } from "node:crypto";
// Phase 0 fallback adapter. The Prisma schema is checked in under prisma/schema.prisma;
// switch this repository to its Prisma implementation once DATABASE_URL is configured.
const orders = new Map();
export const store = {
    create(order) { const now = new Date().toISOString(); const value = { ...order, id: `KG-${new Date().getFullYear()}-${randomUUID().slice(0, 6).toUpperCase()}`, createdAt: now, updatedAt: now }; orders.set(value.id, value); return value; },
    get(id) { return orders.get(id); },
    list() { return [...orders.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); },
    updateStatus(id, status) { const existing = orders.get(id); if (!existing)
        return; const value = { ...existing, status, updatedAt: new Date().toISOString() }; orders.set(id, value); return value; },
};
//# sourceMappingURL=store.js.map