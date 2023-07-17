export const getErrorKey = (message: string) => {
  const messageSplit = message.split("/");
  return messageSplit[1];
};
