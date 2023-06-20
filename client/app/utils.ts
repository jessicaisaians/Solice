import moment from "jalali-moment";

export const calculateDuration = (
  startTimestamp: number,
  endTimestamp: number
) => {
  const durationInMilliseconds = endTimestamp - startTimestamp;

  const seconds = Math.floor(durationInMilliseconds / 1000) % 60;
  const minutes = Math.floor(durationInMilliseconds / 1000 / 60) % 60;
  const hours = Math.floor(durationInMilliseconds / 1000 / 60 / 60) % 24;
  const days = Math.floor(durationInMilliseconds / 1000 / 60 / 60 / 24);

  const duration = {
    days,
    hours,
    minutes,
    seconds,
  };

  return duration;
};

export const isValidDate = ({
  y,
  m,
  d,
}: {
  y: number;
  m: number;
  d: number;
}): boolean => moment(`${y}/${m}/${d}`, "YYYY/MM/DD").isValid();

export const convertYYYYMMDDToEpoch = ({
  y,
  m,
  d,
}: {
  y: number;
  m: number;
  d: number;
}) => moment.from(`${y}/${m}/${d}`, "fa", "YYYY/MM/DD").locale("fa").valueOf();
export const calcAgeFromYYYMMDD = ({
  y,
  m,
  d,
}: {
  y: number;
  m: number;
  d: number;
}): number => {
  if (isValidDate({ y, m, d })) {
    const birthDate = convertYYYYMMDDToEpoch({ y, m, d });
    return moment().diff(birthDate, "years");
  } else return -1;
};

export const numberInRange = (num: number, min: number, max: number): boolean =>
  num >= min && num <= max;
