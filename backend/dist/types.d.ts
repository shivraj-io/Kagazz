export declare const orderStatuses: readonly ["RECEIVED", "PRINTING", "READY", "COMPLETED"];
export type OrderStatus = typeof orderStatuses[number];
export type PrintConfig = {
    mode: "bw" | "color";
    sides: "single" | "double";
    copies: number;
    binding: "none" | "spiral" | "tape";
    category: "school" | "college" | "office" | "art";
};
export type Order = {
    id: string;
    customerPhone: string;
    files: {
        name: string;
        mimeType: string;
        size: number;
    }[];
    config: PrintConfig;
    amount: number;
    paymentMethod: "PAY_AT_SHOP";
    paymentStatus: "PENDING" | "PAID";
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
};
//# sourceMappingURL=types.d.ts.map