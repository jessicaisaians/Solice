import { isAdminAuth } from "src/middleware/Auth";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { handleReturnError } from "../../utils/functions";
import { GraphQLContext } from "../../utils/types";
import {
  RemoveColorInput,
  SetupColorInput,
  SetupColorResponse,
} from "../../utils/types/admin";
import { setupColorValidator } from "../../utils/validators/admin";

@Resolver()
export class AdminResolver {
  @Mutation(() => SetupColorResponse)
  @UseMiddleware(isAdminAuth)
  async createOrEditColor(
    @Arg("options", () => SetupColorInput) options: SetupColorInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { name, hexCode, id } = options;
      await setupColorValidator.validate(
        {
          name,
          hexCode,
        },

        { abortEarly: false }
      );

      await prisma.color.upsert({
        where: id
          ? {
              id,
            }
          : {
              name,
            },
        update: {
          hexCode,
          name,
        },
        create: {
          hexCode,
          name,
        },
      });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "رنگ دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  @UseMiddleware(isAdminAuth)
  async removeColor(
    @Arg("options", () => RemoveColorInput) options: RemoveColorInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      //   check if the color multiColor exists or not if not create it
      //   set the color of all the products that had this colot to multiColor
      // increase the totProducts field of  multicolor by the number of the products that had tehir colorId set to id
      const { newColorId, id } = options;
      const newColor = newColorId
        ? await prisma.color.findFirst({
            where: {
              id: newColorId,
            },
          })
        : await prisma.color.upsert({
            where: {
              name: "چندرنگ",
            },
            create: {
              name: "چندرنگ",
              hexCode: "",
            },
            update: {
              hexCode: "",
            },
          });
      if (!newColor && !!newColorId)
        throw new Error("رنگ انتخاب شده یافت نشد.");

      const variantsUpdatePromise = prisma.productVariant.updateMany({
        where: {
          colorId: id,
        },
        data: {
          colorId: newColor?.id,
        },
      });

      // Update the products with matching id
      const productsUpdatePromise = prisma.product.updateMany({
        where: {
          colorIds: {
            has: id,
          },
        },
        data: {
          colorIds: {
            set: newColor!.id,
          },
        },
      });
      await prisma.$transaction([variantsUpdatePromise, productsUpdatePromise]);

      const productsToUpdate = await prisma.product.findMany({
        where: {
          colorIds: {
            has: id,
          },
        },
        select: {
          id: true,
        },
      });
      newColor!.totProducts += productsToUpdate.length;
      newColor!.productIds = [
        ...(newColor!.productIds ?? []),
        ...productsToUpdate.map((item) => item.id),
      ];
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "رنگ دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  @UseMiddleware(isAdminAuth)
  async createProduct(
    @Arg("options", () => RemoveColorInput) options: RemoveColorInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      //   check if the color multiColor exists or not if not create it
      //   set the color of all the products that had this colot to multiColor
      // increase the totProducts field of  multicolor by the number of the products that had tehir colorId set to id
      const { newColorId, id } = options;
      const newColor = newColorId
        ? await prisma.color.findFirst({
            where: {
              id: newColorId,
            },
          })
        : await prisma.color.upsert({
            where: {
              name: "چندرنگ",
            },
            create: {
              name: "چندرنگ",
              hexCode: "",
            },
            update: {
              hexCode: "",
            },
          });
      if (!newColor && !!newColorId)
        throw new Error("رنگ انتخاب شده یافت نشد.");

      const variantsUpdatePromise = prisma.productVariant.updateMany({
        where: {
          colorId: id,
        },
        data: {
          colorId: newColor?.id,
        },
      });

      // Update the products with matching id
      const productsUpdatePromise = prisma.product.updateMany({
        where: {
          colorIds: {
            has: id,
          },
        },
        data: {
          colorIds: {
            set: newColor!.id,
          },
        },
      });
      await prisma.$transaction([variantsUpdatePromise, productsUpdatePromise]);

      const productsToUpdate = await prisma.product.findMany({
        where: {
          colorIds: {
            has: id,
          },
        },
        select: {
          id: true,
        },
      });
      newColor!.totProducts += productsToUpdate.length;
      newColor!.productIds = [
        ...(newColor!.productIds ?? []),
        ...productsToUpdate.map((item) => item.id),
      ];
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "رنگ دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
}
