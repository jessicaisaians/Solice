import * as yup from "yup";
import { FieldError } from "../types";
export const fieldInvalidMsg = (fieldName: string) =>
  `${fieldName} معتبر نمی باشد.`;
export const fieldRequiredMsg = (fieldName: string) =>
  `وارد کردن ${fieldName} اجباری می باشد.`;
export const fieldMinMsg = (fieldName: string, min: number) =>
  `طول ${fieldName} باید حداقل ${min} کاراکتر باشد`;
export const fieldMaxMsg = (fieldName: string, max: number) =>
  `طول ${fieldName} باید حداکثر ${max} کاراکتر باشد`;
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
