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
export class SetupCategoryInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  path: string;
}
@InputType()
export class RenameCategoryInput {
  @Field(() => String)
  id: string;
  @Field(() => String)
  newName: string;
}
@InputType()
export class ReOrderCategoryInput {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  newParentId: string | null;
}
@InputType()
export class SetupBrandInput {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
}
@InputType()
export class ProductAttr {
  @Field(() => String)
  key: string;
  @Field(() => String)
  value: string;
}
@InputType()
export class SetupProductInput {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  sku: string;
  @Field(() => String)
  productCode: string;
  @Field(() => String)
  brandId: string;
  @Field(() => String)
  brandName: string;
  @Field(() => String)
  status: string;
  @Field(() => [String])
  tags: string[];
  @Field(() => [ProductAttr])
  attributes: ProductAttr[];
  @Field(() => String)
  categoryId: string;
  @Field(() => String, { nullable: true })
  description: string;
}
@InputType()
export class SetupProductVariantInput {
  @Field(() => Boolean)
  isMainVariant: boolean;
  @Field(() => Number)
  stockCnt: number;
  @Field(() => Number)
  price: number;
  @Field(() => Number, { nullable: true })
  discountPercent: number;
  @Field(() => Date, { nullable: true })
  discountExpiry: Date;
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String)
  sizeId: string;
  @Field(() => [String], { nullable: true })
  images: string[];
  @Field(() => String)
  colorId: string;
  @Field(() => String)
  productId: string;
  @Field(() => [ProductAttr])
  attributes: ProductAttr[];
  @Field(() => String)
  sku: string;
}
@InputType()
export class RemoveBrandInput {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  substituteBrandId?: string;
}
@InputType()
export class RemoveColorInput {
  @Field(() => String)
  id: string;
  @Field(() => String, { nullable: true })
  substituteColorId?: string;
}

export enum ProductStatus {
  DRAFTED = "DRAFTED",
  PUBLISHED = "PUBLISHED",
}
