import { Category, ProductVariant } from "@prisma/client";
import slugify from "slugify";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { handleReturnError } from "../../utils/functions";
import { persianEnglishDigitSpaceRegex } from "../../utils/regex";
import { GraphQLContext } from "../../utils/types";
import {
  ProductStatus,
  ReOrderCategoryInput,
  RemoveColorInput,
  RemoveItemInput,
  RenameCategoryInput,
  SetupBrandInput,
  SetupCategoryInput,
  SetupColorInput,
  SetupColorResponse,
  SetupProductInput,
  SetupProductVariantInput,
  SetupSizeGuideInput,
} from "../../utils/types/admin";
import {
  measurmentsValidator,
  setupBrandValidator,
  setupColorValidator,
  setupProductValidator,
} from "../../utils/validators/admin";
import { renameCategoryValidator } from "../../utils/validators/user";

@Resolver()
export class AdminResolver {
  //* Color
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
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
      if (id)
        await prisma.productVariant.updateMany({
          where: {
            colorId: id,
          },
          data: {
            colorHex: hexCode,
            colorName: name,
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
  // @UseMiddleware(isAdminAuth)
  async removeColor(
    @Arg("options", () => RemoveColorInput) options: RemoveColorInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      // remove the color and replace the colroId of prodcutVariants wiht that colorId
      const { substituteColorId, id } = options;
      await prisma.color.delete({
        where: {
          id,
        },
      });
      // find the replacement color by Id or find the default color and if it doesnt exist create it and if it does, increase its totProducts
      let substituteColor = await prisma.color.findUnique({
        where: substituteColorId
          ? {
              id: substituteColorId,
            }
          : {
              name: "چندرنگ",
            },
      });
      if (!substituteColor)
        substituteColor = await prisma.color.create({
          data: {
            hexCode: "",
            name: "چندرنگ",
          },
        });
      await prisma.productVariant.updateMany({
        where: {
          colorId: id,
        },
        data: {
          colorId: substituteColorId,
          colorHex: substituteColor.hexCode,
          colorName: substituteColor.name,
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
  //* End of Color

  // * Start of Size
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async createOrEditSize(
    @Arg("options", () => SetupBrandInput) options: SetupBrandInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { name, id } = options;
      await setupBrandValidator.validate(
        {
          name,
        },
        { abortEarly: false }
      );

      await prisma.size.upsert({
        where: id
          ? {
              id,
            }
          : {
              name,
            },
        update: {
          name,
        },
        create: {
          name,
        },
      });
      if (id)
        await prisma.productVariant.updateMany({
          where: {
            sizeId: id,
          },
          data: {
            sizeName: name,
          },
        });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "سایز دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async removeSize(
    @Arg("options", () => RemoveItemInput) options: RemoveItemInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      // remove the brand and replace the colroId of prodcutVariants wiht that brandId
      const { substituteId: substituteSizeId, id } = options;
      await prisma.size.delete({
        where: {
          id,
        },
      });
      // find the replacement size by Id or find the default size and if it doesnt exist create it and if it doesrzzzzzzzzzzzzz
      let substituteBrand = await prisma.size.findUnique({
        where: substituteSizeId
          ? {
              id: substituteSizeId,
            }
          : {
              name: "نامشخص",
            },
      });
      if (!substituteBrand)
        substituteBrand = await prisma.size.create({
          data: {
            name: "نامشخص",
          },
        });

      await prisma.productVariant.updateMany({
        where: {
          sizeId: id,
        },
        data: {
          sizeId: substituteSizeId,
          sizeName: substituteBrand.name,
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
  // * End of Size
  // * Start of Brand
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async createOrEditBrand(
    @Arg("options", () => SetupBrandInput) options: SetupBrandInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { name, id } = options;
      await setupBrandValidator.validate(
        {
          name,
        },
        { abortEarly: false }
      );

      await prisma.brand.upsert({
        where: id
          ? {
              id,
            }
          : {
              name,
            },
        update: {
          name,
        },
        create: {
          name,
        },
      });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "برند دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async removeBrand(
    @Arg("options", () => RemoveItemInput) options: RemoveItemInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      // remove the brand and replace the colroId of prodcutVariants wiht that brandId
      const { substituteId: substituteBrandId, id } = options;
      await prisma.brand.delete({
        where: {
          id,
        },
      });
      // find the replacement brand by Id or find the default brand and if it doesnt exist create it and if it does, increase its totProducts
      let substituteBrand = await prisma.brand.findUnique({
        where: substituteBrandId
          ? {
              id: substituteBrandId,
            }
          : {
              name: "نامشخص",
            },
      });
      if (!substituteBrand)
        substituteBrand = await prisma.brand.create({
          data: {
            name: "نامشخص",
          },
        });

      const sumOfTotSells = await prisma.product
        .aggregate({
          where: {
            brandId: id,
          },
          _sum: {
            totSells: true,
          },
        })
        .then((result) => result._sum.totSells ?? 0);
      const result = await prisma.product.updateMany({
        where: {
          brandId: id,
        },
        data: {
          brandId: substituteBrandId,
          brandName: substituteBrand.name,
        },
      });
      substituteBrand.totSells += sumOfTotSells ?? 0;
      substituteBrand.totProducts += result.count ?? 0;
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
  // * End of Brand
  // * Start of Category
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async createCategory(
    @Arg("options", () => SetupCategoryInput) options: SetupCategoryInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { name, path } = options;
      if (!persianEnglishDigitSpaceRegex.test(name))
        return {
          success: false,
          errors: [
            {
              path: "name",
              message:
                "نام دسته می‌تواند تنها شامل حروف فارسی و انگلیسی، عدد و فاصله باشد و طول آن باید حدافل 2 کاراکتر باشد.",
            },
          ],
        };
      // path should be like this: ",women,shoes,"
      await prisma.category.create({
        data: {
          name,
          path,
        },
      });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "دسته دیگری با این مشخصات وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async removeCategory(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const catToRemove = await prisma.category.findUnique({
        where: { id },
      });
      if (!catToRemove) throw new Error("دسته مورد نظر یافت نشد.");
      // women/shoes/heels -> ['',women, shoes, heels,'']
      // women -> ['',women,''] -> length===3 => root
      const pathArr = catToRemove.path.split(",");
      const parentNamePathCombo =
        pathArr.length > 3
          ? {
              name: pathArr[pathArr.length - 3],
              path: `,${pathArr.slice(1, -2).join(",")},`,
            }
          : { name: "همه", path: ",همه," };
      // find the new Category if it was'nt found => create the default category "همه"
      const newCat = await prisma.category.findUnique({
        where: {
          name_path: parentNamePathCombo,
        },
      });
      const parentOrDefaultCategory =
        newCat ??
        (await prisma.category.create({
          data: parentNamePathCombo,
        }));
      // update the categoryId of all products under that category and set it to the parent category or the default cat called "همه"
      await prisma.product.updateMany({
        where: {
          categoryId: id,
        },
        data: {
          categoryId: parentOrDefaultCategory.id,
        },
      });

      const result = await prisma.category.findMany({
        where: {
          path: { startsWith: catToRemove.path },
          id: { not: catToRemove.id },
        },
      });
      let updatedItemInPromiseIds: string[] = [];
      let updatedItemInErrorBlockIds: string[] = [];
      // Update the category's leaf categories by replacing the categories name followed by a comma with an empty string
      await Promise.all(
        result.map(async (category: Category) => {
          console.log(
            "before------------------" + category.path + "-----" + category.name
          );
          // if its been replaced inside the error catch block just leave it be
          // ? update only if its not bee nupdated in the error block yet (not inside updatedItemInErrorBlockIds)
          const newCatPath = category.path.includes(catToRemove.name)
            ? category.path.replace(catToRemove.name + ",", "")
            : category.path;
          try {
            if (!updatedItemInErrorBlockIds.includes(category.id)) {
              await prisma.category.update({
                where: { id: category.id },
                data: {
                  path: newCatPath,
                },
              });
              updatedItemInPromiseIds.push(category.id);
            }
          } catch (err) {
            if (err.code === "P2002") {
              const newCatPathArr = newCatPath.split(",");
              const catIndex = newCatPathArr.findIndex(
                (item) => item === category.name
              );
              const pathwithNumberedCatName =
                newCatPathArr.length > 3
                  ? newCatPathArr.slice(0, catIndex).join(",") +
                    "," +
                    category.name +
                    "_"
                  : "," + category.name + "_";

              const count = await prisma.category.count({
                where: {
                  path: {
                    startsWith: pathwithNumberedCatName,
                  },
                  name: {
                    startsWith: category.name + "_",
                  },
                },
              });
              const newName = category.name + "_" + (count + 1);
              const newPath = pathwithNumberedCatName + (count + 1);
              // ? ,مردانه,کفش,رسمی,تخت, gets updated before and کفش gets removed before the error for removing shoes and
              // ? renaming رسمی to رسمی_1
              // * update the cats with their ids inside result.map(item=>item.id)
              // * and their path starts with newCatPath
              // * for the path: replace the category.name inside their names with newName
              // * for the name: if the name is equal to category.name-> update the name to newName too
              const catsThatHaveCatRemovedFromPath =
                await prisma.category.findMany({
                  where: {
                    id: {
                      in: updatedItemInPromiseIds,
                    },
                    path: {
                      startsWith: newCatPath,
                    },
                  },
                });
              await Promise.all(
                catsThatHaveCatRemovedFromPath.map(async (item: Category) => {
                  const itemNewPath = item.path.replace(category.name, newName);
                  const itemNewName =
                    item.name === category.name ? newName : item.name;
                  await prisma.category.update({
                    where: { id: item.id },
                    data: { name: itemNewName, path: itemNewPath },
                  });
                  updatedItemInErrorBlockIds.push(item.id);
                })
              );

              // ? for the rest of the items that didnt get updated before the error:
              // ? We need to update them right here
              // * update the ones with their paths starting with category.path and ids arent inside catsThatHaveCatRemovedFromPath
              // * for the path: replace the category.name inside their paths with newName
              // * replace the name: if the name is the same as category.name-> update the name to newName

              const itemsToBeUpdated = await prisma.category.findMany({
                where: {
                  id: { notIn: updatedItemInErrorBlockIds },
                  path: { startsWith: category.path },
                },
              });
              await Promise.all(
                itemsToBeUpdated.map(async (item: Category) => {
                  const itemPath = item.path
                    .replace(catToRemove.name + ",", "")
                    .replace(category.name, newName);
                  const itemName =
                    item.name === category.name ? newName : item.name;
                  await prisma.category.update({
                    where: { id: item.id },
                    data: { name: itemName, path: itemPath },
                  });
                  updatedItemInErrorBlockIds.push(item.id);
                })
              );
              // ? At last update the category with category.id and set newName and newPath
              await prisma.category.update({
                where: {
                  id: category.id,
                },
                data: {
                  path: newPath,
                  name: newName,
                },
              });
              updatedItemInErrorBlockIds.push(category.id);
            } else {
              throw err;
            }
          }
        })
      );
      // remove the category
      await prisma.category.delete({
        where: {
          id: catToRemove.id,
        },
      });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "دسته دیگری با این مشخصات وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async renameCategory(
    @Arg("options", () => RenameCategoryInput) options: RenameCategoryInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { id, newName } = options;

      await renameCategoryValidator.validate(
        {
          newName,
        },

        { abortEarly: false }
      );
      if (!persianEnglishDigitSpaceRegex.test(newName)) {
        return {
          success: false,
          errors: [
            {
              path: "name",
              message:
                "نام دسته می‌تواند تنها شامل حروف فارسی و انگلیسی، عدد و فاصله باشد و طول آن باید حدافل 2 کاراکتر باشد.",
            },
          ],
        };
      }
      const catToEdit = await prisma.category.findUnique({
        where: {
          id,
        },
      });

      if (!catToEdit) throw new Error("دسته موردنظر یافت نشد.");
      const path = catToEdit.path;
      const name = catToEdit.name;
      const result = await prisma.category.findMany({
        where: { path: { contains: path } },
      });
      await Promise.all(
        result.map(async (category: Category) => {
          if (category.name === name) {
            category.name = newName;
          }
          category.path = category.path.replace(name, newName);
          await prisma.category.update({
            where: { id: category.id },
            data: {
              name: category.name,
              path: category.path,
            },
          });
        })
      );

      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "newName", "دسته دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async reOrderCategory(
    @Arg("options", () => ReOrderCategoryInput) options: ReOrderCategoryInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { id, newParentId } = options;

      const catToEdit = await prisma.category.findUnique({
        where: {
          id,
        },
      });

      if (!catToEdit) throw new Error("دسته موردنظر یافت نشد.");
      const parentCat = newParentId
        ? await prisma.category.findUnique({
            where: {
              id: newParentId,
            },
          })
        : null;
      if (!parentCat && newParentId)
        throw new Error("دسته مادر موردنظر یافت نشد.");
      const oldPath = catToEdit.path;
      // ",shoes,"

      const name = catToEdit.name;
      if (!!parentCat) {
        const newParentsPath = parentCat.path;
        const newPath = newParentsPath + name + ",";
        const result = await prisma.category.findMany({
          where: { path: { startsWith: oldPath } },
        });
        await Promise.all(
          result.map(async (category: Category) => {
            try {
              category.path = category.path.replace(oldPath, newPath);
              await prisma.category.update({
                where: { id: category.id },
                data: {
                  path: category.path,
                },
              });
            } catch (err) {
              if (err.code === "P2002") {
                throw new Error(
                  `دسته دیگری با نام "${catToEdit.name}" در دسته "${parentCat.name}" وجود دارد.`
                );
              }
            }
          })
        );
      } else {
        const result = await prisma.category.findMany({
          where: { path: { startsWith: oldPath } },
        });
        await Promise.all(
          result.map(async (category: Category) => {
            try {
              if (category.id === id) {
                // root
                category.path = `,${name},`;
              } else {
                // children of catToEdit
                category.path = category.path.replace(name + ",", "");
              }

              await prisma.category.update({
                where: { id: category.id },
                data: {
                  path: category.path,
                },
              });
            } catch (err) {
              if (err.code === "P2002") {
                throw new Error(
                  `دسته دیگری با نام "${catToEdit.name}" در دسته اصلی وجود دارد.`
                );
              }
            }
          })
        );
      }

      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(
            err,
            "newName",
            "دسته دیگری با این نام در این دسته وجود دارد."
          )
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  // * End of Category
  // * Start of Product
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async createOrEditProduct(
    @Arg("options", () => SetupProductInput) options: SetupProductInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const {
        name,
        id,
        brandId,
        brandName,
        description,
        productCode,
        sku,
        categoryId,
        status,
        tags,
        attributes,
      } = options;
      await setupProductValidator.validate(
        {
          name,
          sku,
          productCode,
          description,
          tags,
          attributes,
        },
        { abortEarly: false }
      );

      const slugTime = new Date().getTime();
      const slugTitle = slugify(options.name);
      const slug = `${slugTitle}-${slugTime}`;

      let miscBrand = null;
      if (!brandId) {
        miscBrand = await prisma.brand.findUnique({
          where: { name: "نامشخص" },
        });
        if (!miscBrand) {
          miscBrand = await prisma.brand.create({
            data: {
              name: "نامشخص",
            },
          });
        }
      }
      const cat = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!cat) throw new Error("دسته انتخاب شده نامعتبر می‌باشد.");
      const data = {
        brandId: brandId ?? miscBrand!.id,
        brandName: brandName ?? miscBrand!.name,
        name,
        sku,
        description: description ?? "",
        slug,
        status:
          status?.toLowerCase() === "published"
            ? ProductStatus.PUBLISHED
            : ProductStatus.DRAFTED,
        productCode,
        attributes,
        tags,
        categoryId,
      };
      if (!id) {
        await prisma.product.create({
          data: data,
        });
        await prisma.brand.update({
          where: {
            id: brandId ?? miscBrand?.id,
          },
          data: {
            totProducts: {
              increment: 1,
            },
          },
        });
      } else {
        const product = await prisma.product.findUnique({
          where: {
            id,
          },
        });
        const oldBrandId = product?.brandId;
        const newBrandId = brandId;
        await prisma.product.update({
          where: {
            id,
          },
          data,
        });
        if (oldBrandId !== newBrandId) {
          await prisma.brand.update({
            where: {
              id: newBrandId ?? miscBrand?.id,
            },
            data: {
              totProducts: {
                increment: 1,
              },
            },
          });
          await prisma.brand.update({
            where: {
              id: oldBrandId,
            },
            data: {
              totProducts: {
                decrement: 1,
              },
            },
          });
        }
      }

      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "محصول دیگری با این مشخصات وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async removeProduct(
    @Arg("id", () => String) id: string,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
        select: {
          brandId: true,
        },
      });
      if (!product) throw new Error("محصول موردنظر یافت نشد.");

      await prisma.brand.update({
        where: {
          id: product.brandId,
        },
        data: {
          totProducts: {
            decrement: 1,
          },
        },
      });
      await prisma.product.delete({
        where: {
          id,
        },
      });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "محصول دیگری با این مشخصات وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  // * End of Product
  // * Start of Product Variant
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async createOrEditProductVariant(
    @Arg("options", () => SetupProductVariantInput)
    options: SetupProductVariantInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const {
        id,
        sku,
        colorId,
        discountExpiry,
        discountPercent,
        images,
        isMainVariant,
        price,
        productId,
        sizeId,
        stockCnt,
        attributes,
      } = options;
      const color = await prisma.color.findUnique({
        where: {
          id: colorId,
        },
      });
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      if (!product) throw new Error("محصول موردنظر یافت نشده.");
      if (!color)
        return {
          errors: [
            {
              message: "رنگ انتخاب شده یافت نشد.",
              path: "color",
            },
          ],
          success: false,
        };

      const size = await prisma.size.findUnique({
        where: {
          id: sizeId,
        },
      });
      if (!size)
        return {
          errors: [
            {
              message: "سایز انتخاب شده یافت نشد.",
              path: "size",
            },
          ],
          success: false,
        };
      const data = {
        colorHex: color.hexCode,
        colorName: color.name,
        colorId,
        discountExpiry,
        discountPercent,
        isMainVariant,
        price,
        sizeName: size.name,
        sizeId,
        sku,
        stockCnt,
        attributes,
        images,
        productCode: product.productCode,
        productId: productId,
      };

      const productVariants = await prisma.productVariant.findMany({
        where: {
          productId,
        },
      });
      let newTotColors = product.totColors;
      let curVariant = null;
      if (!id) {
        curVariant = await prisma.productVariant.create({
          data,
        });

        if (
          productVariants.findIndex(
            (item: ProductVariant) => item.colorId === colorId
          ) < 0
        )
          newTotColors++;
      } else {
        const variantToUpdate = await prisma.productVariant.findFirst({
          where: {
            id,
          },
        });
        if (!variantToUpdate) throw new Error("محصول موردنظر یافت نشد.");
        const oldColorId = variantToUpdate.colorId;
        if (oldColorId !== colorId) {
          let variantsWithOldColorId = 0;
          productVariants.map((item: ProductVariant) => {
            if (item.colorId === oldColorId && item.id !== id)
              variantsWithOldColorId++;
          });
          if (variantsWithOldColorId === 0) newTotColors--;
          const newColorExists =
            productVariants.findIndex(
              (item: ProductVariant) => item.colorId === colorId
            ) >= 0;
          if (!newColorExists) newTotColors++;
        }

        await prisma.productVariant.update({
          where: { id },
          data,
        });
      }
      if (isMainVariant && product.mainVariantId) {
        await prisma.productVariant.update({
          where: { id: product.mainVariantId },
          data: {
            isMainVariant: false,
          },
        });
      }
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          ...(isMainVariant && {
            mainVariantId: id ?? curVariant!.id,
            mainDiscountExpiry: discountExpiry,
            mainDiscountPercent: discountPercent,
            mainImage: images?.[0],
            mainPrice: price,
          }),
          totColors: newTotColors,
        },
      });

      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "محصول دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async removeProductVariant(
    @Arg("id", () => String)
    id: string,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const variant = await prisma.productVariant.findUnique({
        where: {
          id,
        },
        include: {
          product: {
            select: {
              totColors: true,
            },
          },
        },
      });
      if (!variant) throw new Error("محصول موردنظر یافت نشد.");

      const productVariants = await prisma.productVariant.findMany({
        where: {
          productId: variant.productId,
        },
      });

      let newTotColors = variant.product.totColors;

      const variantToUpdate = await prisma.productVariant.findFirst({
        where: {
          id,
        },
      });
      if (!variantToUpdate) throw new Error("محصول موردنظر یافت نشد.");
      const colorToRemove = variantToUpdate.colorId;

      let variantsWithOldColorId = 0;
      productVariants.map((item: ProductVariant) => {
        if (item.colorId === colorToRemove && item.id !== id)
          variantsWithOldColorId++;
      });
      if (variantsWithOldColorId === 0) newTotColors--;
      let mainVariantProperties = {};
      const isVarToRemoveMain = variant.isMainVariant;
      if (isVarToRemoveMain) {
        const newMainVariantId = productVariants.findIndex(
          (item: ProductVariant) => item.id !== id
        );
        if (newMainVariantId < 0) {
          // the variant we removed was the only variant of this product
          mainVariantProperties = {
            mainDiscountExpiry: null,
            mainDiscountPercent: 0,
            mainImage: "",
            mainPrice: 0,
          };
        } else {
          mainVariantProperties = {
            mainDiscountExpiry:
              productVariants[newMainVariantId].discountExpiry,
            mainDiscountPercent:
              productVariants[newMainVariantId].discountPercent,
            mainImage: productVariants[newMainVariantId].images?.[0] ?? "",
            mainPrice: productVariants[newMainVariantId].price,
          };
        }
      }
      await prisma.productVariant.delete({
        where: { id },
      });

      await prisma.product.update({
        where: {
          id: variant.productId,
        },
        data: {
          ...(isVarToRemoveMain && mainVariantProperties),
          totColors: newTotColors,
        },
      });

      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "محصول دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  // * End of Product Variant
  // * Start of Product Measurments
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async addOrEditSizeGuide(
    @Arg("options", () => SetupSizeGuideInput)
    options: SetupSizeGuideInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      const { measurments, id, brandId } = options;
      await measurmentsValidator.validate(
        { measurments },
        { abortEarly: false }
      );
      const brand = await prisma.brand.findUnique({
        where: {
          id: brandId,
        },
      });
      if (!brand) throw new Error("برند موردنظر یافت نشد.");
      if (id) {
        const measurmentToEdit = await prisma.sizeGuide.findUnique({
          where: {
            id,
          },
        });
        if (!measurmentToEdit)
          throw new Error("جدول سایزبندی موردنظر یافت نشد.");

        await prisma.sizeGuide.update({
          where: { id },
          data: {
            brandId,
            measurments,
          },
        });
      } else {
        await prisma.sizeGuide.create({
          data: {
            brandId,
            measurments,
          },
        });
      }
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2002"
        ? handleReturnError(err, "name", "محصول دیگری با این نام وجود دارد.")
        : err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  @Mutation(() => SetupColorResponse)
  // @UseMiddleware(isAdminAuth)
  async removeSizeGuide(
    @Arg("id", () => String)
    id: string,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<SetupColorResponse> {
    try {
      await prisma.sizeGuide.delete({
        where: {
          id,
        },
      });
      return {
        success: true,
      };
    } catch (err: any) {
      return err?.code === "P2023"
        ? handleReturnError(err, "id", "شناسه وارد شده نامعتبر می‌باشد.")
        : handleReturnError(err);
    }
  }
  // * End of Product Measurments
}
