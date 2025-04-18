"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Обгортка для всіх провайдерів, які використовуються в проєкті.
 * В даний момент - React Query та NextAuth.
 * @param children Дочірні компоненти.
 */
export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
