import {SystemTimeFormatEnumMetadata} from "../../../TimeFormat";

export function SYSTEM_SETTINGS_TIME_DEFAULT_FOMRAT(format: SystemTimeFormatEnumMetadata): string{
  return `%dt %MMN %yyyy, ${format == "24-h" ? "%HH" :"%hh"}:%mm`
}
