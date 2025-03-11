"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FormType } from "../(forms)/formsConfig";
import BaseForm from "../(forms)/BaseForm";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    // formData.email, formData.password — відповідно до вашої Login-конфігурації
    console.log("Form submitted:", formData);

    // signIn("credentials") - для CredentialsProvider
    // redirect: false => щоб обробляти результат вручну
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      // У разі помилки - наприклад, вивести в консоль або показати повідомлення
      console.error("Login error:", result.error);
      alert(`Error: ${result.error}`);
    } else {
      // Успішний логін
      console.log("Login success:", result);
      // Можна зробити редірект, оновлення сторінки або router.push
      router.push("/"); // або '/dashboard', як ви задумали
    }
  };

  return <BaseForm formType={FormType.LOGIN} handleSubmit={handleSubmit} />;
}
