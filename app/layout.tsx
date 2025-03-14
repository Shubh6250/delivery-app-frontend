import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FoodHub - Multi-role Food Delivery App",
  description: "A multi-role food delivery application with user, restaurant, delivery, and admin interfaces",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="page-transition-in">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'