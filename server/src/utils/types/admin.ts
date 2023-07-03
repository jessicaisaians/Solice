import { Field, InputType, ObjectType } from "type-graphql";
import { FieldError } from ".";
@InputType()
export class SetupColorInput {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  hexCode: string;
}
@ObjectType()
export class SetupColorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Boolean)
  success: boolean;
}
@InputType()
export class RemoveColorInput {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  newColorId?: string;
}
