import { Gender } from "@prisma/client";
import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from ".";
@ObjectType()
export class SendVerificationCodeResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => Boolean, { nullable: true })
  isLogin?: boolean;
  @Field(() => Boolean, { nullable: true })
  hasPassword?: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
@ObjectType()
export class UserSessionInfo {
  @Field(() => String)
  id: string;
  @Field(() => String)
  role: string;
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
  promoCode: string | null;
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
}
