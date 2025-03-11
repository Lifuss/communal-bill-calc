export enum FormType {
  LOGIN = "login",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgotPassword",
  RESET_PASSWORD = "resetPassword",
}

type Field = {
  label: string;
  name: string;
  type?: string; // "text", "password", "email", тощо
};

type FormConfig = {
  title: string;
  fields: Field[];
  submitText: string;
};

export const formsConfig: Record<FormType, FormConfig> = {
  [FormType.LOGIN]: {
    title: "Логін",
    fields: [
      { label: "Логін", name: "email", type: "email" },
      { label: "Пароль", name: "password", type: "password" },
    ],
    submitText: "Увійти",
  },
  [FormType.REGISTER]: {
    title: "Реєстрація",
    fields: [
      { label: "Email", name: "email", type: "email" },
      { label: "Password", name: "password", type: "password" },
      { label: "Confirm Password", name: "password2", type: "password" },
    ],
    submitText: "Зареєструватися",
  },
  [FormType.FORGOT_PASSWORD]: {
    title: "Забули пароль?",
    fields: [{ label: "Email", name: "email", type: "email" }],
    submitText: "Відновити пароль",
  },
  [FormType.RESET_PASSWORD]: {
    title: "Reset Password",
    fields: [{ label: "New Password", name: "newPassword", type: "password" }],
    submitText: "Update Password",
  },
};
