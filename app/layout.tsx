import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertexa LLC — Connect. Innovate. Grow.",
  description:
    "Vertexa builds scalable digital platforms for modern businesses. Creating focused technology products that simplify operations, connect workflows, and help businesses grow.",
  keywords: ["Vertexa", "technology", "SaaS", "digital platforms", "Vaiter", "restaurant technology"],
  icons: {
    icon: [
      { url: "/vertexa-icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Vertexa LLC — Connect. Innovate. Grow.",
    description:
      "Vertexa builds scalable digital platforms for modern businesses.",
    url: "https://vertexa.us",
    siteName: "Vertexa LLC",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://vertexa.us"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body>{children}</body>
    </html>
  );
}
