import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import GlobalLoader from "@/components/GlobalLoader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "NextOwner",
  description: "NextOwner Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <Navbar />
        <main className="flex-1">
          <GlobalLoader>
          {children}
          </GlobalLoader>
          </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}