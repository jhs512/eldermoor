"use client";

import { AuthProvider } from "@/global/auth/hooks/useAuth";

import { Toaster } from "@/components/ui/sonner";

import ClientLayout from "./ClientLayout";

export default function ContextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ClientLayout>{children}</ClientLayout>
      <Toaster richColors />
    </AuthProvider>
  );
}
