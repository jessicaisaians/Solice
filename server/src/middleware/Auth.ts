import { GraphQLError } from "graphql";
import { GraphQLContext } from "src/utils/types";
import { MiddlewareFn } from "type-graphql";
export const isUserAuth: MiddlewareFn<GraphQLContext> = async (
  { context },
  next
) => {
  try {
    if (!context.session?.user)
      throw new GraphQLError("شما مجوز دسترسی به این منبع را ندارید.", {
        extensions: {
          code: "UNAUTHORIZED",
        },
      });
    else return next();
  } catch (err) {
    throw err;
  }
};
