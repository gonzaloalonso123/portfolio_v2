import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Gonzalo Alonso</title>
        <meta name="description" content="A futuristic space-themed portfolio showcasing my projects and skills" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  generator: "v0.dev",
  applicationName: "Gonzalo Alonso",
  referrer: "origin-when-cross-origin",
  keywords: ["Gonzalo Alonso", "Portfolio", "Web Developer", "Space-themed"],
  authors: [{ name: "Gonzalo Alonso", url: "https://gonzaloalonso.dev" }],
  creator: "Gonzalo Alonso",
  publisher: "Gonzalo Alonso",
  colorScheme: "dark light",
  themeColor: "#000000",
};
