import { useState } from "react";

function plainInput(input: string): string {
  return input
    .replace(/['"`;]/g, "")
    .replace(/--/g, "")
    .trim();
}

export function usePlainTextForm<T extends Record<string, any>>(
  initialValues: T
) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getPlainForm = () => {
    const sanitized: Record<string, any> = {};
    for (const key in form) {
      const value = form[key];
      sanitized[key] = typeof value === "string" ? plainInput(value) : value;
    }
    return sanitized;
  };

  return { form, handleChange, getPlainForm };
}
