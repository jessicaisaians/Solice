import * as yup from "yup";
import { hexColorRegex } from "../regex";

import {
  fieldInvalidMsg,
  fieldMaxMsg,
  fieldMinMsg,
  fieldRequiredMsg,
} from "./errMessages";

export const hexCodeValdiate = yup
  .string()
  .matches(hexColorRegex, fieldInvalidMsg("کد رنگ"));

export const setupColorValidator = yup.object().shape({
  hexCode: hexCodeValdiate.required(fieldRequiredMsg("کد رنگ")),

  name: yup
    .string()
    .min(2, fieldMinMsg("نام رنگ", 2))
    .max(12, fieldMaxMsg("نام رنگ", 12))
    .required(fieldRequiredMsg("نام رنگ")),
});
