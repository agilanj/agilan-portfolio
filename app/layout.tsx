import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agilanj.github.io"),
  title: "Agilan J — Cybersecurity Engineer & Software Developer",
  description: "Portfolio of Agilan J, an aspiring cybersecurity engineer and software developer building secure, scalable, AI-powered applications.",
  openGraph: {
    title: "Agilan J — Secure systems, thoughtfully built.",
    description: "Cybersecurity, software development, AI, automation, and modern product design.",
    url: "https://agilanj.github.io",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630, alt: "Agilan J portfolio placeholder" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="scroll-smooth"><body>{children}</body></html>;
}
