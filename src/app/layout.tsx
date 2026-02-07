import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn with Doc",
  description: "A basic project setup with routes and framer-motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
