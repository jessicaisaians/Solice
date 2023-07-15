import argon2 from "argon2";
import pick from "lodash.pick";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isUserAuth } from "../../middleware/Auth";
import { generateReferralCode, handleReturnError } from "../../utils/functions";
import { objectIdPattern } from "../../utils/regex";
import { GraphQLContext } from "../../utils/types";
import {
  CheckVerificationCodeResponse,
  GetProductsInput,
  GetProductsResponse,
  GetUserInfoResponse,
  SendVerificationCodeResponse,
  SetupUserInfoInput,
  SetupUserInfoResponse,
} from "../../utils/types/user";
import {
  checkVerificationCodeValidator,
  mobileValidator,
  setupUserInfoInputSchema,
} from "../../utils/validators/user";

@Resolver()
export class UserResolver {
  @Query(() => SendVerificationCodeResponse)
  async sendVerificationCode(
    @Arg("mobile") mobile: string,
    @Ctx() { myCache, prisma }: GraphQLContext
  ): Promise<SendVerificationCodeResponse> {
    try {
      await mobileValidator.validate(
        {
          mobile,
        },
        { abortEarly: false }
      );
      const userExists = await prisma.user.findFirst({
        where: {
          mobile,
        },
      });
      console.log(userExists);
      const mobileTrimmed = mobile.trim();
      const code = Math.floor(Math.random() * 9000 + 1000).toString();
      const cacheKey = mobileTrimmed;
      // await sendKaveSms({
      //   kaveApi,
      //   msgBody: `کد تایید: ${code}`,
      //   receptor: mobile,
      // });
      myCache.set(cacheKey, code);
      console.log(
        "---------------------------code------------------------",
        code
      );
      return {
        hasPassword: !!userExists?.password,
        isLogin: !!userExists,
        success: true,
      };
    } catch (err: any) {
      return handleReturnError(err);
    }
  }
  @Query(() => CheckVerificationCodeResponse)
  async passwordLogin(
    @Arg("mobile") mobile: string,
    @Arg("password") password: string,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<CheckVerificationCodeResponse> {
    try {
      await mobileValidator.validate(
        {
          mobile,
        },
        { abortEarly: false }
      );
      const user = await prisma.user.findFirst({
        where: {
          mobile,
        },
      });
      if (!user) throw new Error("کاربر با این مشخصات یافت نشد.");
      if (!user.password)
        throw new Error(
          "شما برای حساب کاربری خود رمز عبور ایجاد نکرده‌اید. جهت ورود از رمز یکبارمصرف استفاده کنید."
        );
      const valid = await argon2.verify(user.password, password);
      if (!valid)
        return {
          success: false,
          errors: [
            {
              path: "password",
              message: "رمز عبور اشتباه می‌باشد.",
            },
          ],
          isLogin: true,
          user,
        };
      else
        return {
          isLogin: true,
          success: true,
          user,
        };
    } catch (err: any) {
      return handleReturnError(err);
    }
  }
  @Query(() => GetUserInfoResponse)
  async getUserInfo(
    @Arg("mobile") mobile: string,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<GetUserInfoResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { mobile: mobile.trim() },
        include: {
          referrer: {
            select: {
              referralCode: true,
            },
          },
        },
      });
      if (!user) throw new Error("کاربری با مشخصات وارد شده یافت نشد");
      const referrerCode = user?.referrer?.referralCode;
      return {
        referrerCode,
        ...pick(user, [
          "birthday",
          "email",
          "firstName",
          "lastName",
          "gender",
          "username",
        ]),
      };
    } catch (err) {
      throw new Error(err?.message ?? err);
    }
  }
  @Mutation(() => CheckVerificationCodeResponse)
  async checkVerificationCode(
    @Arg("mobile", () => String) mobile: string,
    @Arg("code", () => String) code: string,
    @Ctx() { myCache, prisma }: GraphQLContext
  ): Promise<CheckVerificationCodeResponse> {
    const myCode = code;
    const mob = mobile.trim();
    try {
      await checkVerificationCodeValidator.validate(
        {
          mobile: mob,
          code: myCode,
        },

        { abortEarly: false }
      );

      const lastCode = myCache.get(mob);
      if (myCode !== lastCode) throw new Error("کد وارد شده نامعتبر می‌باشد.");
      else {
        let referralCode = generateReferralCode();
        while (await prisma.user.findUnique({ where: { referralCode } })) {
          referralCode = generateReferralCode();
        }
        try {
          const user = await prisma.user.create({
            data: { mobile, username: mobile, email: mobile, referralCode },
          });
          return {
            isLogin: false,
            success: true,
            user,
            hasPassword: !!user?.password,
          };
        } catch (err) {
          if (err.code === "P2002") {
            const user = await prisma.user.findFirst({
              where: {
                mobile,
              },
            });
            if (!user) throw new Error("کاربر با این مشخصات یافت نشد.");
            return {
              isLogin: true,
              success: true,
              user: user ?? undefined,
              hasPassword: !!user?.password,
            };
          } else throw new Error(err);
        } finally {
          myCache.take(mob);
        }
      }
    } catch (err: any) {
      return handleReturnError(err);
    }
  }
  @Mutation(() => SetupUserInfoResponse)
  @UseMiddleware(isUserAuth)
  async setupUserInfo(
    @Arg("options", () => SetupUserInfoInput) options: SetupUserInfoInput,
    @Ctx() { prisma, session }: GraphQLContext
  ): Promise<SetupUserInfoResponse> {
    try {
      const {
        birthday,
        password,
        firstName,
        lastName,
        email,
        promoCode,
        gender,
        isLogin,
        username,
      } = options;
      await setupUserInfoInputSchema(isLogin).validate(options, {
        abortEarly: false,
      });

      const referrerUser = promoCode
        ? await prisma.user.findUnique({
            where: {
              referralCode: promoCode,
            },
          })
        : null;
      if (!referrerUser && !!promoCode)
        return {
          success: false,
          errors: [
            {
              path: "promoCode",
              message: "کد معرف وارد شده نامعتبر می‌باشد.",
            },
          ],
        };
      const hashedPassword = password ? await argon2.hash(password!) : null;
      try {
        const user = await prisma.user.update({
          where: {
            id: session?.user?.id,
          },
          data: {
            referrerId: referrerUser?.id,
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(hashedPassword && { password: hashedPassword }),
            ...(birthday && { birthday }),
            ...(email && { email }),
            gender: gender === "male" ? "MALE" : "FEMALE",
            ...(username && { username }),
          },
        });
        if (referrerUser) {
          referrerUser.totReferrals = referrerUser.totReferrals + 1;
        }
        return {
          success: true,
          user: {
            id: user.id,
          },
        };
      } catch (err) {
        if (err.code === "P2002")
          return {
            success: false,
            errors: [
              {
                message: `${
                  err?.meta?.target?.includes("email")
                    ? "آدرس ایمیل"
                    : "نام کاربری"
                } متعلق به کاربر دیگری می‌باشد.`,
                path: err?.meta?.target?.includes("email")
                  ? "email"
                  : "username",
              },
            ],
          };
        if (err?.code === "P2025")
          return {
            success: false,
            errors: [
              {
                message: "کاربر یافت نشد",
                path: "",
              },
            ],
          };
        else throw new Error(err);
      }
    } catch (err: any) {
      console.log(err?.code);
      return handleReturnError(err);
    }
  }

  // * Products
  @Query(() => GetProductsResponse)
  async getProducts(
    @Arg("options", () => GetProductsInput) options: GetProductsInput,
    @Ctx() { prisma }: GraphQLContext
  ): Promise<GetProductsResponse> {
    try {
      const {
        brands,
        categories,
        colors,
        justDiscounted,
        justInStock,
        limit,
        maxPrice,
        minPrice,
        offset,
        sizes,
        descOrAsc,
        sortBy,
      } = options;
      const sortDir = descOrAsc === "asc" ? "asc" : "desc";
      const orderByOptions = [
        {
          title: "name",
          obj: { name: sortDir },
        },
        {
          title: "price",
          obj: { price: sortDir },
        },
        { title: "stock", obj: { stockCnt: sortDir } },
      ];

      const orderBy = orderByOptions.find((item) => item.title === sortBy);
      const areIdsValid = [
        ...(colors ?? []),
        ...(categories ?? []),
        ...(brands ?? []),
        ...(sizes ?? []),
      ]?.every((item) => objectIdPattern.test(item));
      if (!areIdsValid) throw new Error("شناسه وارد شده نامعتبر می‌باشد.");
      const products = await prisma.product.findMany({
        where: {
          AND: [
            {
              status: "PUBLISHED",
              ...(!!categories?.length && {
                categoryId: {
                  in: categories,
                },
              }),
            },

            {
              ...(!!brands?.length && {
                brandId: {
                  in: brands,
                },
              }),
            },
            {
              ...(justInStock && {
                productVariants: {
                  some: {
                    stockCnt: {
                      gt: 0,
                    },
                  },
                },
              }),
            },
            {
              ...(justDiscounted === true && {
                productVariants: {
                  some: {
                    AND: [
                      {
                        discountPercent: {
                          gt: 0,
                        },
                        discountExpiry: {
                          lt: new Date(),
                          not: null,
                        },
                      },
                    ],
                  },
                },
              }),
            },
            {
              ...(!!colors?.length && {
                productVariants: {
                  some: {
                    colorId: {
                      in: colors,
                    },
                  },
                },
              }),
            },
            {
              ...(!!sizes?.length && {
                productVariants: {
                  some: {
                    sizeId: {
                      in: sizes,
                    },
                  },
                },
              }),
            },
            {
              ...((!!minPrice || !!maxPrice) && {
                productVariants: {
                  some: {
                    price: {
                      ...(!!minPrice && { gte: minPrice }),
                      ...(!!maxPrice && { lte: maxPrice }),
                    },
                  },
                },
              }),
            },
          ],
        },

        skip: offset ?? 0,
        take: limit ?? 15,
        orderBy: [
          orderBy?.title === "name"
            ? {
                name: sortDir,
              }
            : {
                createdAt: sortDir,
              },
        ],
        include: {
          productVariants: {
            ...(!!orderBy?.title && {
              orderBy: [orderBy.obj as any],
            }),
          },
        },
      });

      return {
        success: true,
        products,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  catch(err: any) {
    console.log(err?.code);
    return handleReturnError(err);
  }
}
