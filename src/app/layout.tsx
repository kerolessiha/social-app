"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import theme from "./theme";
import "./globals.css";
import store from "@/lib/store";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import dynamic from "next/dynamic";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const DynamicNavbar = dynamic(() => import("./_components/_navbar/Navbar"), {
  ssr: false,
});
const DynamicFooter = dynamic(() => import("./_components/_footer/Footer"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content="Your site description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${roboto.variable} font-sans`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <DynamicNavbar />
              {children}
              <DynamicFooter />
              <Toaster />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
