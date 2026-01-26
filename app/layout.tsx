import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./globals.css";
import { Navbar } from "./components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./Providers";
import FooterPage from "./components/layout/Footer";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Kixo Shop",
  description: "Ecommerce Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <FooterPage />
        </Providers>
      </body>
    </html>
  );
}
