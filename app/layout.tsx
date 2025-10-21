import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheBox - Construction Company",
  description: "Building things is our mission. Professional construction services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
