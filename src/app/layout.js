import { Manrope } from "next/font/google";
import "./globals.css";

import AppShell from "@/components/shared/AppShell";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CrowdFunding | Bring Great Ideas to Life",
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

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
