import * as yup from "yup";
import { FieldError } from "../types";
export const phoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
export const fieldInvalidMsg = (fieldName: string) =>
  `${fieldName} معتبر نمی باشد.`;
export const mobValidate = yup
  .string()
  .matches(phoneRegex, fieldInvalidMsg("شماره موبایل"));

export const sendVerificationCodeValidator = yup.object().shape({
  mobile: mobValidate,
});

export const formatYupError = (err: yup.ValidationError): FieldError[] => {
  const errors: FieldError[] = [];

  err?.inner?.forEach((e: any) => {
    errors.push({
      path: e.path,
      message: e.message,
    });
  });
  return errors;
};
