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
    else {
      const user = await context.prisma.user.findFirst({
        where: {
          AND: [
            {
              role: "USER",
            },
            {
              id: context.session?.user?.id,
            },
          ],
        },
      });
      if (!user)
        throw new GraphQLError("شما مجوز دسترسی به این منبع را ندارید.", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      else return next();
    }
  } catch (err) {
    throw err;
  }
};
export const isAdminAuth: MiddlewareFn<GraphQLContext> = async (
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
    else {
      const isAdmin = await context.prisma.user.findFirst({
        where: {
          AND: [
            {
              role: "ADMIN",
            },
            {
              id: context.session?.user?.id,
            },
          ],
        },
      });
      if (!isAdmin) {
        throw new GraphQLError(
          "شما مجوز کافی برای انجام این عملیات را ندارید.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      } else return next();
    }
  } catch (err) {
    throw err;
  }
};
