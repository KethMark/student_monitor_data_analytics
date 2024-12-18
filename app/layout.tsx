import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackQuery from "@/components/tanstack";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <TanstackQuery>
            <div className="w-full max-w-7xl mx-auto space-y-10 p-5">
              <div className="flex justify-between mt-4">
                <p className="font-bold text-lg">Student Monitoring Data</p>
                <ModeToggle/>
              </div>
              {children}
            </div>
          </TanstackQuery>
        </ThemeProvider>
      </body>
    </html>
  );
}
