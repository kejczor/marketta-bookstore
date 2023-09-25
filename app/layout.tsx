import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";
import WidthController from "@components/layout/WidthController";

import "./globals.css";
import Providers from "@components/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketta Bookstore",
  description: "Check out our offer, you will find something for yourself, we promise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full min-h-screen text-gray-200 bg-neutral-900 flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="py-9 flex-grow">
            <WidthController>{children}</WidthController>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
