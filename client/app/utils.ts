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
