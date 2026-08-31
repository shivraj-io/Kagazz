import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Kagazz · Simple printing", description: "Send print jobs to your local shop." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
