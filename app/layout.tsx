import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "Desa Mulyamekar | Kecamatan Babakancikao",
  description: "Website informasi resmi Desa Mulyamekar, Kecamatan Babakancikao, Kabupaten Purwakarta, Jawa Barat."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body><Navbar />{children}<Footer /></body></html>;
}