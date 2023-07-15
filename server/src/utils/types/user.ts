import { Gender } from "@prisma/client";
import { Field, InputType, ObjectType } from "type-graphql";

import { FieldError } from ".";
import { Product } from "./../../prisma/generated/prisma-client-js/models/Product";

@ObjectType()
export class SendVerificationCodeResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Boolean, { nullable: true })
  isLogin?: boolean;
  @Field(() => Boolean, { nullable: true })
  hasPassword?: boolean;
}
@ObjectType()
export class UserSessionInfo {
  @Field(() => String)
  id: string;
}
@ObjectType()
export class GetUserInfoResponse {
  @Field(() => Date, { nullable: true })
  birthday: Date | null;
  @Field(() => String, { nullable: true })
  email: string | null;
  @Field(() => String, { nullable: true })
  firstName: string | null;
  @Field(() => String, { nullable: true })
  lastName: string | null;
  @Field(() => String, { nullable: true })
  username: string | null;
  @Field(() => String, { nullable: true })
  referrerCode: string | null | undefined;
  @Field(() => String)
  gender: Gender | null;
}
@ObjectType()
export class SetupUserInfoResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => UserSessionInfo, { nullable: true })
  user?: UserSessionInfo;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
@ObjectType()
export class CheckVerificationCodeResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => Boolean, { nullable: true })
  isLogin?: boolean;
  @Field(() => Boolean, { nullable: true })
  hasPassword?: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => UserSessionInfo, { nullable: true })
  user?: UserSessionInfo;
}
@InputType()
export class SetupUserInfoInput {
  @Field(() => String, { nullable: true })
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String, { nullable: true })
  username?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  promoCode?: string;
  @Field(() => Date, { nullable: true })
  birthday?: Date;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  confPassword?: string;
  @Field(() => String)
  gender: string;
  @Field(() => Boolean)
  isLogin: boolean;
}
@InputType()
export class GetProductsInput {
  @Field(() => String, { nullable: true })
  sortBy?: string;
  @Field(() => String, { nullable: true })
  descOrAsc?: string;
  @Field(() => Number, { nullable: true })
  offset?: number;
  @Field(() => Number, { nullable: true })
  limit?: number;
  @Field(() => [String], { nullable: true })
  brands?: string[];
  @Field(() => [String], { nullable: true })
  sizes?: string[];
  @Field(() => [String], { nullable: true })
  colors?: string[];
  @Field(() => [String], { nullable: true })
  categories?: string[];
  @Field(() => Boolean, { nullable: true })
  justInStock?: boolean;
  @Field(() => Boolean, { nullable: true })
  justDiscounted?: boolean;
  @Field(() => Number, { nullable: true })
  minPrice?: number;
  @Field(() => Number, { nullable: true })
  maxPrice?: number;
}

@ObjectType()
export class GetProductsResponse {
  @Field(() => [Product], { nullable: true })
  products?: Product[];
  @Field(() => Boolean)
  success: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
