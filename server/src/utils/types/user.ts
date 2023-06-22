import { Field, ObjectType } from "type-graphql";
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
