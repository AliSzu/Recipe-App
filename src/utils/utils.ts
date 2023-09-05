import {
  CollectionReference,
  DocumentData,
  collection,
  getFirestore,
} from "firebase/firestore";
import i18next from "i18next";

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(getFirestore(), collectionName) as CollectionReference<
    T,
    DocumentData
  >;
};

export const uniqueId = () => {
  return (Date.now() * Math.floor(Math.random() * 10000)).toString();
};

export const calculateMinutes = (hours: number, minutes: number) => {
  return hours * 60 + +minutes;
};

const pluralizeTime = (count: number, unit: string) => {
  if (count === 1) {
    return `${i18next.t(`time.${unit}.base`)}`;
  } else if (count >= 2 && count <= 4) {
    return `${i18next.t(`time.${unit}.plural`)}`;
  } else {
    return `${i18next.t(`time.${unit}.pluralSecond`)}`;
  }
};
export const minutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
  }

  if (hours === 0) {
    return `${remainingMinutes} ${pluralizeTime(remainingMinutes, "minute")}`;
  } else if (remainingMinutes === 0) {
    return `${hours} ${pluralizeTime(hours, "hour")}`;
  } else {
    return `${hours} ${pluralizeTime(
      hours,
      "hour"
    )} ${remainingMinutes} ${pluralizeTime(remainingMinutes, "minute")}`;
  }
};
