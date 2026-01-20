import "./styles/globals.css";
import Navbar from "./components/Navbar";
import { Marcellus } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Fashion",
  description: "Modern fashion e-commerce website",
  keywords: ["fashion", "shopping", "open fashion", "clothing"],
  authors: [{ name: "Aesha Thakkar" }],
  creator: "Open Fashion",
  icons: {
    icon: "/image.png",
  },
};

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={marcellus.variable}>
      <body className="app-layout">
        <Navbar />
        <main className="main-content">{children}</main>
        <footer className="site-footer">
          © 2026 OpenFashion. All rights reserved.
        </footer>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
