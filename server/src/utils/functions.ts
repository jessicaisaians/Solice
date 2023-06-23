import kave from "kavenegar";
import { promisify } from "util";
import { formatYupError } from "./validators/user";

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

export const handleReturnError = (err: any) => ({
  errors: !!err?.errors
    ? formatYupError(err)
    : [{ path: "", message: err?.message ?? "مشکلی رخ داده است." }],
  success: false,
});
