import {SystemStateMetadata, SystemStringStateCorrection} from "../interface/System";

//TODO Doc
export function checkSystemStringLength(value: string | undefined, min: number, max: number): SystemStringStateCorrection {
  if (!value || value.length < min) return SystemStateMetadata.StringTooShort;
  if (value.length > max) return SystemStateMetadata.StringTooLong;
  return SystemStateMetadata.StringCorrect;
}
