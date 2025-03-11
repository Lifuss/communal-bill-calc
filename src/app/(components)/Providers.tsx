"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * Обгортка для всіх провайдерів, які використовуються в проєкті.
 * В даний момент - лише SessionProvider(NextAuth).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
