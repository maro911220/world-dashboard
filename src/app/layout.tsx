import "@/style/global.css";

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  title: "Maro World Dashboard",
  description: "Maro World Dashboard",
  metadataBase: new URL("https://maro-world.vercel.app"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Maro World Dashboard",
    siteName: "Maro World Dashboard",
    url: "https://maro-world.vercel.app",
    description: "Maro World Dashboard",
    images: "/tumb.png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
