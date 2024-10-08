import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/utils/index.css";
import NextTopLoader from "nextjs-toploader";
import StoreProvider from "@/redux/StoreProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <NextTopLoader color="#EE6D33" showSpinner={false} />
        <ToastContainer/>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
