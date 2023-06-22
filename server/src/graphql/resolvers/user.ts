import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { sendKaveSms } from "../../utils/functions";
import { GraphQLContext } from "../../utils/types";
import { SendVerificationCodeResponse } from "../../utils/types/user";
import {
  formatYupError,
  sendVerificationCodeValidator,
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
      myCache.set(cacheKey, code);
      console.log(cacheKey);
      await sendKaveSms({
        kaveApi,
        msgBody: `کد تایید: ${code}`,
        receptor: mobile,
      });
      return {
        hasPassword: !!userExists?.password,
        isLogin: !!userExists,
        success: true,
      };
    } catch (err: any) {
      return {
        errors: !!err?.errors
          ? formatYupError(err)
          : [{ path: "", message: err?.message ?? "مشکلی رخ داده است." }],
        success: false,
      };
    }
  }
}
