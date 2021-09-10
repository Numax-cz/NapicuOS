import { NoBootDevice } from "../Config/BlackScreenText";
import { setDisplayText } from "./Stage/text";

export function checkBootSector(): void {
    setDisplayText(NoBootDevice);
}