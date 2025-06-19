import type { Metadata } from "next";
import "./globals.css";
import { Cart } from "@/components/cart/cart";
import { LoginAreaDialog } from "@/components/loginArea/login-area-dialog";



export const metadata: Metadata = {
  title: "Loja-Jota",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="">{children}
        <Cart/>
        <LoginAreaDialog/>
      </body>
    </html>
  );
}
