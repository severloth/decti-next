import type { Metadata } from "next";
import "./globals.css";
import {roboto} from "./font";
import { montserrat } from "./font";  

export const metadata: Metadata = {
  title: "UTEC",
  description: "Usina tecnológica de San Miguel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
