import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Infant } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const cormorantInfant = Cormorant_Infant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yadev's Wedding Invitation",
  description: "Join us in celebrating our marriage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorantInfant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-cormorant bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
