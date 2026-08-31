import type { Order, OrderStatus } from "./types.js";
export declare const store: {
    create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): {
        customerPhone: string;
        files: {
            name: string;
            mimeType: string;
            size: number;
        }[];
        config: import("./types.js").PrintConfig;
        amount: number;
        paymentMethod: "PAY_AT_SHOP";
        paymentStatus: "PENDING" | "PAID";
        status: OrderStatus;
        id: string;
        createdAt: string;
        updatedAt: string;
    };
    get(id: string): Order | undefined;
    list(): Order[];
    updateStatus(id: string, status: OrderStatus): {
        id: string;
        customerPhone: string;
        files: {
            name: string;
            mimeType: string;
            size: number;
        }[];
        config: import("./types.js").PrintConfig;
        amount: number;
        paymentMethod: "PAY_AT_SHOP";
        paymentStatus: "PENDING" | "PAID";
        createdAt: string;
        status: "COMPLETED" | "PRINTING" | "READY" | "RECEIVED";
        updatedAt: string;
    } | undefined;
};
//# sourceMappingURL=store.d.ts.map