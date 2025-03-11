"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { FormType } from "../(forms)/formsConfig";
import BaseForm from "../(forms)/BaseForm";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    // formData.email, formData.password, formData.password2
    if (!formData.email || !formData.password || !formData.password2) {
      alert("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Викликаємо наш ендпоінт для реєстрації:
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        // Якщо статус не 200-299
        const errorData = await res.json();
        alert(`Failed to register: ${errorData.error || "Unknown error"}`);
        return;
      }

      // Якщо користувача успішно створено, можна або відправити на логін:
      // router.push("/auth/login");
      // або одразу спробувати залогінити:
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (signInResult?.error) {
        alert(`Sign in error: ${signInResult.error}`);
      } else {
        // Успішний логін
        router.push("/");
      }
    } catch (error) {
      alert("Something went wrong with registration.");
      console.error("Register error:", error);
    }
  };

  return <BaseForm formType={FormType.REGISTER} handleSubmit={handleSubmit} />;
}
