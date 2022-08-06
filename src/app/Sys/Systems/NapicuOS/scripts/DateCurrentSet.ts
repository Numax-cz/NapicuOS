import {DateCurrentSetMetadata} from "../interface/DateCurrentSet";

export function DateCurrentSet(setDate: DateCurrentSetMetadata): Date {
  const date = new Date();

  if(setDate.year !== undefined) date.setFullYear(setDate.year);
  if(setDate.month !== undefined) date.setMonth(setDate.month);
  if(setDate.day !== undefined) date.setDate(setDate.day);
  if(setDate.hours !== undefined) date.setHours(setDate.hours);
  if(setDate.minutes !== undefined) date.setMinutes(setDate.minutes);

  return date;
}
