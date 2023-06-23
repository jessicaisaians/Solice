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
export class SetupUserInfoResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
@ObjectType()
export class CheckVerificationCodeResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => Boolean, { nullable: true })
  isLogin?: boolean;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
@InputType()
export class SetupUserInfoInput {
  @Field(() => String, { nullable: true })
  fName: string;
  @Field(() => String, { nullable: true })
  lName?: string;
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
