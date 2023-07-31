export const getMessageKey = (message: string) => {
  const messageSplit = message.split("/");
  return messageSplit.length > 1 ? messageSplit[1] : messageSplit[0];
};
