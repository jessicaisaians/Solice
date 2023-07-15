import * as yup from "yup";
import { alphaNumHyphenUnderscoreRegex, hexColorRegex } from "../regex";

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

export const setupBrandValidator = yup.object().shape({
  name: yup
    .string()
    .min(2, fieldMinMsg("نام برند", 2))
    .max(30, fieldMaxMsg("نام برند", 30))
    .required(fieldRequiredMsg("نام برند")),
});

const productAttributeSchema = yup.object().shape({
  key: yup.string().required(fieldRequiredMsg("نام برند")),
  value: yup.string().required(fieldRequiredMsg("نام برند")),
});
const measurmentsSchema = yup.object().shape({
  group: yup.string().required(fieldRequiredMsg("گروه سایز")),
  label: yup.string().required(fieldRequiredMsg("لیبل سایز")),
  size: yup.string().required(fieldRequiredMsg("نام سایز")),
  value: yup.string().required(fieldRequiredMsg("اندازه سایز")),
});

export const setupProductValidator = yup.object().shape({
  name: yup
    .string()
    .min(2, fieldMinMsg("نام محصول", 2))
    .max(60, fieldMaxMsg("نام محصول", 60))
    .required(fieldRequiredMsg("نام محصول")),
  sku: yup
    .string()
    .matches(alphaNumHyphenUnderscoreRegex, fieldInvalidMsg("کد SKU")),
  productCode: yup
    .string()
    .matches(alphaNumHyphenUnderscoreRegex, fieldInvalidMsg("کد محصول")),
  description: yup
    .string()
    .optional()
    .min(2, fieldMinMsg("توضیح محصول", 2))
    .max(100, fieldMaxMsg("توضیح محصول", 100)),
  tags: yup
    .array()
    .of(
      yup
        .string()
        .min(2, fieldMinMsg("برچسب محصول", 2))
        .max(100, fieldMaxMsg("برچسب محصول", 15))
    ),
  attributes: yup.array().of(productAttributeSchema),
});

export const measurmentsValidator = yup.object().shape({
  measurments: yup.array().of(measurmentsSchema),
});
