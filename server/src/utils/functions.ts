import kave from "kavenegar";
import fetch from "node-fetch";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { formatYupError } from "./validators/errMessages";
export const sendKaveSms = async ({
  kaveApi,
  msgBody,
  receptor,
}: {
  kaveApi: kave.kavenegar.KavenegarInstance;
  msgBody: string;
  receptor: string;
}) => {
  const sendSms = promisify(kaveApi.Send.bind(kaveApi));
  const sendSmsPromise = sendSms({
    message: msgBody,
    sender: "10008663",
    receptor,
  });
  const response = await sendSmsPromise;
  if (response.status !== 200)
    throw new Error("مشکلی در ارسال پیامک رخ داده است. لطفا مجددا تلاش کنید.");
};

export const handleReturnError = (
  err: any,
  path?: string | null,
  message?: string | null
) => ({
  errors: !!err?.errors
    ? formatYupError(err)
    : [
        {
          path: path ?? "",
          message: message ?? err?.message ?? "مشکلی رخ داده است.",
        },
      ],
  success: false,
});

export const getServerSession = async (cookie: string) => {
  const res = await fetch("http://localhost:3000/api/auth/session", {
    headers: { cookie: cookie },
  });
  const session = await res.json();
  return session;
};

export const generateReferralCode = () => {
  return uuidv4().split("-")[0]; // Use only the first part of the UUID for the referral code
};

export const getReferralExpiry = () => {
  const expiryDate = new Date();

  // Add one month to the current date
  expiryDate.setMonth(expiryDate.getMonth() + 1);

  // return the referralExpiry property of the referrerUser
  return expiryDate;
};
