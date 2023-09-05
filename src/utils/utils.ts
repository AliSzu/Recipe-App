import {
  CollectionReference,
  DocumentData,
  collection,
  getFirestore,
} from "firebase/firestore";
import i18next from "i18next";
import { Time } from "../types/RecipeTypes";

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
export const TimeToText = (minutes: number) => {
  const time: Time = minutesToTime(minutes)

  if (time.hours === 0) {
    return `${time.minutes} ${pluralizeTime(time.minutes, "minute")}`;
  } else if (time.minutes === 0) {
    return `${time.hours} ${pluralizeTime(time.hours, "hour")}`;
  } else {
    return `${time.hours} ${pluralizeTime(
      time.hours,
      "hour"
    )} ${time.minutes} ${pluralizeTime(time.minutes, "minute")}`;
  }
};

export const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return {hours: hours, minutes: remainingMinutes} as Time
}
