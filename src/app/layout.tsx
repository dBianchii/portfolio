import "@/styles/globals.css";

import { GeistSans } from "geist/font";
import Header from "./_components/Header";

export const metadata = {
  title: "Gabriel Bianchi Software",
  description: "Software Developer",
  icons: [{ url: "/favicon.ico" }],
  // openGraph: {
  //   images: [{ url: "/og-image" }],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   images: [{ url: "/og-image" }],
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`font-sans ${GeistSans.variable}`}>
      <body className="scrollbar-none min-h-screen scroll-smooth bg-slate-600 text-zinc-50 antialiased">
        <main className="container mx-auto flex-1 px-1 md:px-4">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
