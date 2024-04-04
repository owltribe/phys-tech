import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import '@radix-ui/themes/styles.css';
import {Theme} from "@radix-ui/themes";
import ToastProvider from "@/providers/ToasterProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Science Услуги | Научные услуги Казахстан",
  description: "Платформа для исследователей, компаний, научных институтов, университетов и других организаций.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <ReactQueryProvider>
          <Theme
            accentColor="blue"
            radius="large"
          >
            {children}
          </Theme>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
