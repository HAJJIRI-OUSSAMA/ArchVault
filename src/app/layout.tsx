import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Software Engineering Docs — From First Principles",
  description:
    "A comprehensive, architect-level knowledge base covering engineering foundations, architecture, design patterns, distributed systems, databases, DevOps, and security — structured as a progressive curriculum.",
  keywords: [
    "software engineering",
    "system design",
    "architecture",
    "design patterns",
    "distributed systems",
    "databases",
    "devops",
    "security",
    "clean architecture",
    "microservices",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
