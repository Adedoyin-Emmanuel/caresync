import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ReduxProvider } from "./store/provider";
import { Toaster } from "react-hot-toast";
import Seo from "./components/Seo/Seo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme" suppressHydrationWarning>
      <Seo />
      <body className="bg-zinc-50">
        <Toaster />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
