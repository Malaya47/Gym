import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ConditionalNavbar } from "@/components/conditional-navbar";
import { ReduxProvider } from "@/components/redux-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sentinators - Transform Your Body, Transform Your Life",
  description:
    "Join Sentinators premium fitness center with expert trainers, modern equipment, and personalized workout plans to achieve your fitness goals.",
  generator: "v0.app",
  icons: {
    icon: "/gym-logo.png",
    apple: "/gym-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <ConditionalNavbar />
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ReduxProvider>
      </body>
    </html>
  );
}
