import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://genaro-garcia.vercel.app"),
  title: "Genaro García — Desarrollador IA & Sistemas Agénticos",
  description:
    "Portfolio de Genaro García: desarrollador de IA especializado en sistemas agénticos, computer vision e implementación end-to-end. Célula de IA en HitoFusion.",
  keywords: [
    "Genaro García",
    "Desarrollador IA",
    "Sistemas Agénticos",
    "Computer Vision",
    "LLM",
    "Claude Code",
    "n8n",
  ],
  authors: [{ name: "Genaro García" }],
  openGraph: {
    title: "Genaro García — Desarrollador IA & Sistemas Agénticos",
    description:
      "Sistemas agénticos, computer vision e implementación end-to-end. +30 agentes en producción.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-aurora">{children}</body>
    </html>
  );
}
