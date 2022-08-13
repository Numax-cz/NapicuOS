import {SystemTimeFormatEnumMetadata} from "./TimeFormat";

// export const TIME_FORMAT = '%dt %MN, %HH:%mm %a';

export function GET_SYSTEM_TIME_FORMAT(format: SystemTimeFormatEnumMetadata): string{
  return `%dt %MN, ${format == "24-h" ? "%HH" :"%hh"}:%mm %a`
}

export const TIME_FORMAT_MHA = '%hh:%mm %a';
export const TIME_FORMAT_CALENDAR = '%MMN %dt %yyyy';
