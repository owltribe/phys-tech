import type { Metadata } from "next";
import localFont from "next/font/local";
import {Theme} from "@radix-ui/themes";

import '@radix-ui/themes/styles.css';
import "./globals.css";

import ToastProvider from "@/providers/ToasterProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import {AuthProvider} from "@/providers/AuthProvider";
import RoutesProtectionProvider from "@/providers/RoutesProtectionProvider";
import Header from "@/components/landing/Header";

const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/GoogleSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },    {
      path: '../../public/fonts/GoogleSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/GoogleSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-google-sans'
})

export const metadata: Metadata = {
  title: "Science Услуги | Научные, научно-исследовательские услуги Казахстан",
  description: "Платформа для исследователей, компаний, научных институтов, университетов и других организаций.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={googleSans.className}>
        <ToastProvider />
        <ReactQueryProvider>
          <Theme
            accentColor="blue"
          >
            <AuthProvider>
              <RoutesProtectionProvider />
              {children}
            </AuthProvider>
          </Theme>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
