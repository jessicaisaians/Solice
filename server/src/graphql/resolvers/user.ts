import { Role } from "@prisma/client";
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
import { handleReturnError } from "../../utils/functions";
import { GraphQLContext } from "../../utils/types";
import {
  CheckVerificationCodeResponse,
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
    @Ctx() { myCache, prisma, kaveApi }: GraphQLContext
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
          role: Role.USER,
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
      });
      if (!user) throw new Error("کاربری با مشخصات وارد شده یافت نشد");
      return pick(user, [
        "birthday",
        "email",
        "firstName",
        "lastName",
        "gender",
        "username",
        "promoCode",
      ]);
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
        try {
          const user = await prisma.user.create({
            data: { mobile, username: mobile, email: mobile },
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
                role: Role.USER,
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

      const hashedPassword = password ? await argon2.hash(password!) : null;
      try {
        const user = await prisma.user.update({
          where: {
            id: session?.user?.id,
          },
          data: {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(promoCode && { promoCode }),
            ...(hashedPassword && { password: hashedPassword }),
            ...(birthday && { birthday }),
            ...(email && { email }),
            gender: gender === "male" ? "MALE" : "FEMALE",
            ...(username && { username }),
          },
        });
        return {
          success: true,
          user: {
            id: user.id,
            role: user.role,
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
}
