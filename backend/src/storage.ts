import { randomUUID } from "node:crypto";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.S3_BUCKET;
const region = process.env.AWS_REGION;
const client = bucket && region ? new S3Client({ region, endpoint: process.env.S3_ENDPOINT || undefined, forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true" }) : undefined;

export function storageConfigured() { return Boolean(client && bucket); }
export function keyForMimeType(mimeType: string) { const extension = mimeType === "application/pdf" ? "pdf" : "jpg"; return `staging/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`; }
export async function createUploadUrl(key: string, mimeType: string) { if (!client || !bucket) throw new Error("S3 is not configured"); return getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: mimeType }), { expiresIn: 300 }); }
export async function createDownloadUrl(key: string) { if (!client || !bucket) throw new Error("S3 is not configured"); return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 300 }); }
