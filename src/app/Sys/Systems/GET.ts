import { NapicuOS } from "./NapicuOS/system.napicuos";

export function getSystemTime(): string { //TODO string/number
    return NapicuOS.systemTime;
}