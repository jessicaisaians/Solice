import argon2 from "argon2";
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
  SendVerificationCodeResponse,
  SetupUserInfoInput,
  SetupUserInfoResponse,
} from "../../utils/types/user";
import {
  checkVerificationCodeValidator,
  sendVerificationCodeValidator,
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
      await sendVerificationCodeValidator.validate(
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
  @Mutation(() => CheckVerificationCodeResponse)
  async checkVerificationCode(
    @Arg("mobile", () => String) mobile: string,
    @Arg("code", () => String) code: string,
    @Ctx() { myCache, prisma }: GraphQLContext
  ): Promise<CheckVerificationCodeResponse> {
    console.log(code);
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
          await prisma.user.create({
            data: { mobile },
          });
          return {
            isLogin: false,
            success: true,
          };
        } catch (err) {
          if (err.code === "P2002")
            return {
              isLogin: true,
              success: true,
            };
          else throw new Error(err);
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
        fName: firstName,
        lName: lastName,
        email,
        promoCode,
        gender,
        username,
      } = options;
      console.log(gender);
      await setupUserInfoInputSchema.validate(options, {
        abortEarly: false,
      });

      const hashedPassword = password ? await argon2.hash(password!) : null;
      try {
        await prisma.user.update({
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
