import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // 1. Дістаємо дані з credentials
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // 2. Знаходимо користувача в БД
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        // 3. Перевіряємо пароль
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Password is incorrect");
        }

        // 4. Якщо все ок, повертаємо об'єкт user
        return {
          id: user.id,
          name: user.name, // або user.fullName
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // За бажанням, session-based чи jwt-based
  },
  callbacks: {
    async jwt({ token, user }) {
      // user буде доступним лише у момент логіну
      if (user) {
        token.id = user.id; // Запишемо id у токен
      }
      return token;
    },
    async session({ session, token }) {
      // Запишемо у session.id те, що є у токені
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
