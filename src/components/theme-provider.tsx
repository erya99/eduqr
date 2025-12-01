"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Tip hatasını önlemek için React.ComponentProps kullanıyoruz
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}