import type { Metadata } from "next";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ReduxProvider } from "./store/provider";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Caresync",
  description: "Bridging health care with technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className="bg-zinc-50">
        <Toaster />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
