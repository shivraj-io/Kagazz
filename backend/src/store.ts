import { randomUUID } from "node:crypto";
import type { Order, OrderStatus } from "./types.js";

// Phase 0 fallback adapter. The Prisma schema is checked in under prisma/schema.prisma;
// switch this repository to its Prisma implementation once DATABASE_URL is configured.
const orders = new Map<string, Order>();
export const store = {
  create(order: Omit<Order, "id" | "createdAt" | "updatedAt">) { const now = new Date().toISOString(); const value = { ...order, id: `KG-${new Date().getFullYear()}-${randomUUID().slice(0, 6).toUpperCase()}`, createdAt: now, updatedAt: now }; orders.set(value.id, value); return value; },
  get(id: string) { return orders.get(id); },
  list() { return [...orders.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); },
  updateStatus(id: string, status: OrderStatus) { const existing = orders.get(id); if (!existing) return; const value = { ...existing, status, updatedAt: new Date().toISOString() }; orders.set(id, value); return value; },
};
