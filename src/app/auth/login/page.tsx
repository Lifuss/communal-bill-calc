"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FormType } from "../(forms)/formsConfig";
import BaseForm from "../(forms)/BaseForm";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      console.error("Login error:", result.error);
      alert(`Error: ${result.error}`);
    } else {
      console.log("Login success:", result);
      router.push("/");
    }
  };

  return <BaseForm formType={FormType.LOGIN} handleSubmit={handleSubmit} />;
}
