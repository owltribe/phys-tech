import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import {Theme} from "@radix-ui/themes";

import '@radix-ui/themes/styles.css';
import "./globals.css";

import ToastProvider from "@/providers/ToasterProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import {AuthProvider} from "@/providers/AuthProvider";
import RoutesProtectionProvider from "@/providers/RoutesProtectionProvider";
import Header from "@/components/landing/sections/header";

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFFFF",
}

const APP_NAME = "Science услуги | Научные услуги | Научные услуги Казахстана";
const APP_DEFAULT_TITLE = "Science Услуги | Научные, научно-исследовательские услуги Казахстан";
const APP_TITLE_TEMPLATE = "%s - Science услуги App";
const APP_DESCRIPTION = "Платформа для исследователей, компаний, научных институтов, университетов и других организаций.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="scroll-smooth">
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
