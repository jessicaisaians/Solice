import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./user";
import { AdminResolver } from "./admin";

const resolvers: NonEmptyArray<Function> = [UserResolver, AdminResolver];
export default resolvers;
