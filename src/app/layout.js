import { Manrope } from "next/font/google";
import "./globals.css";

import AppShell from "@/components/shared/AppShell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CrowdFund | Bring Great Ideas to Life",
  description:
    "A crowdfunding platform where creators share ideas and supporters help turn them into reality.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 font-sans text-slate-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}