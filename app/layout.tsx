import "./globals.css";
import type { Metadata } from "next";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import { Inter } from "next/font/google";
import ActiveStatus from "./components/ActiveStatus";

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "coding a messager clone app to levelup skills ",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
