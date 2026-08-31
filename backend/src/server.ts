import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { z } from "zod";
import { calculatePrice } from "./pricing.js";
import { store } from "./store.js";
import { orderStatuses } from "./types.js";
import { createDownloadUrl, createUploadUrl, keyForMimeType, storageConfigured } from "./storage.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";
app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigin, methods: ["GET", "POST", "PATCH"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => { const started = Date.now(); res.on("finish", () => console.info(JSON.stringify({ method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - started }))); next(); });

const configSchema = z.object({ mode: z.enum(["bw", "color"]), sides: z.enum(["single", "double"]), copies: z.number().int().min(1).max(100), binding: z.enum(["none", "spiral", "tape"]), category: z.enum(["school", "college", "office", "art"]) });
const fileSchema = z.object({ name: z.string().min(1).max(255), mimeType: z.enum(["application/pdf", "image/jpeg", "image/jpg"]), size: z.number().int().positive().max(40 * 1024 * 1024), s3Key: z.string().regex(/^staging\/[a-zA-Z0-9_./-]+$/).optional() });
const orderSchema = z.object({ customerPhone: z.string().regex(/^\d{10}$/, "A valid 10 digit phone number is required"), files: z.array(fileSchema).min(1).max(5), config: configSchema });

function adminOnly(req: Request, res: Response, next: NextFunction) { const expected = process.env.ADMIN_TOKEN; if (!expected || req.get("authorization") !== `Bearer ${expected}`) return res.status(401).json({ error: "Unauthorized" }); next(); }
app.get("/health", (_req, res) => res.json({ ok: true, service: "kagazz-api", storage: storageConfigured() ? "configured" : "not_configured" }));
app.post("/api/v1/documents/presign", async (req, res, next) => { const parsed = fileSchema.omit({ s3Key: true }).safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: "Invalid file", details: parsed.error.flatten() }); if (!storageConfigured()) return res.status(503).json({ error: "Document storage is not configured" }); try { const key = keyForMimeType(parsed.data.mimeType); const uploadUrl = await createUploadUrl(key, parsed.data.mimeType); return res.status(201).json({ key, uploadUrl, expiresInSeconds: 300, requiredHeaders: { "Content-Type": parsed.data.mimeType } }); } catch (error) { return next(error); } });
app.post("/api/v1/pricing/quote", (req, res) => { const parsed = orderSchema.pick({ files: true, config: true }).safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: "Invalid print options", details: parsed.error.flatten() }); return res.json({ amount: calculatePrice(parsed.data.files.length, parsed.data.config), currency: "INR" }); });
app.post("/api/v1/orders", (req, res) => { const parsed = orderSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: "Invalid order", details: parsed.error.flatten() }); const amount = calculatePrice(parsed.data.files.length, parsed.data.config); const order = store.create({ ...parsed.data, amount, paymentMethod: "PAY_AT_SHOP", paymentStatus: "PENDING", status: "RECEIVED" }); return res.status(201).json({ order }); });
app.get("/api/v1/orders/:id", (req, res) => { const order = store.get(String(req.params.id)); return order ? res.json({ order }) : res.status(404).json({ error: "Order not found" }); });
app.get("/api/v1/admin/orders", adminOnly, (_req, res) => res.json({ orders: store.list() }));
app.post("/api/v1/admin/documents/download-url", adminOnly, async (req, res, next) => { const input = z.object({ orderId: z.string().min(1), s3Key: z.string().regex(/^staging\/[a-zA-Z0-9_./-]+$/) }).safeParse(req.body); if (!input.success) return res.status(400).json({ error: "Invalid document reference" }); const order = store.get(input.data.orderId); if (!order || !order.files.some((file) => file.s3Key === input.data.s3Key)) return res.status(404).json({ error: "Document not found for order" }); if (!storageConfigured()) return res.status(503).json({ error: "Document storage is not configured" }); try { return res.json({ downloadUrl: await createDownloadUrl(input.data.s3Key), expiresInSeconds: 300 }); } catch (error) { return next(error); } });
app.patch("/api/v1/admin/orders/:id/status", adminOnly, (req, res) => { const status = z.enum(orderStatuses).safeParse(req.body?.status); if (!status.success) return res.status(400).json({ error: "Invalid order status" }); const order = store.updateStatus(String(req.params.id), status.data); return order ? res.json({ order }) : res.status(404).json({ error: "Order not found" }); });
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => { console.error(error); res.status(500).json({ error: "Internal server error" }); });
app.listen(port, () => console.info(`Kagazz API listening on :${port}`));
