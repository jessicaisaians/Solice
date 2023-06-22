import { PrismaClient } from "@prisma/client";
import kave from "kavenegar";
import NodeCache from "node-cache";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class FieldError {
  @Field(() => String)
  message: string;
  @Field(() => String)
  path: string;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  myCache: NodeCache;
  kaveApi: kave.kavenegar.KavenegarInstance;
}

export interface Session {
  user?: User;
}

export interface User {
  id: string;
  username: string;
}
