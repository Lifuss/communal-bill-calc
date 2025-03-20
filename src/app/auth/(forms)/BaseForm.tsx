"use client";

import { Button } from "@/app/(components)/Button";
import { formsConfig, FormType } from "./formsConfig";
import Link from "next/link";

interface BaseFormProps {
  formType: FormType;
  handleSubmit?: (formData: any) => void;
}

export default function BaseForm({ formType, handleSubmit }: BaseFormProps) {
  const config = formsConfig[formType];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!handleSubmit) return;

    const formDataObj: Record<string, string> = {};
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    handleSubmit(formDataObj);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 mx-auto max-w-sm border-1 border-gray-300 rounded-xl mt-[10%] p-4 flex flex-col items-center"
    >
      <h2 className="text-2xl text-center">{config.title}</h2>
      {config.fields.map((field) => (
        <label key={field.name} className="border p-2 rounded-lg">
          <input
            name={field.name}
            placeholder={field.label}
            type={field.type ?? "text"}
          />
        </label>
      ))}

      <Button type="submit" className="px-4 mt-4">
        {config.submitText}
      </Button>
      <div className="mt-2 text-xs">
        {formType === FormType.LOGIN && (
          <Link href="/auth/register" className="text-blue-500">
            Ще не маєте аккаунту?
          </Link>
        )}
        {formType === FormType.REGISTER && (
          <Link href="/auth/login" className="text-blue-500">
            Вже зареєстровані?
          </Link>
        )}
      </div>
    </form>
  );
}
