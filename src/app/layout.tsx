import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martin Aguirre's Portfolio",
  description: "Specialized in Java & Spring Boot Security Engineering. Building secure, scalable backend solutions with enterprise-grade architecture.",
  keywords: ["Backend Developer", "Java", "Spring Boot", "Security Engineering", "Enterprise Architecture"],
  authors: [{ name: "Ron" }],
  creator: "Ron",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://website.com",
    title: "Martin Aguirre's Portfolior",
    description: "Building secure backend solutions with Java & Spring Boot",
    siteName: "Ron Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Aguirre's Portfolior",
    description: "Building secure backend solutions with Java & Spring Boot",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
