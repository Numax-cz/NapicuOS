import {User} from "../../../User";
import {systemDrivesMetadata} from "./FilesDirs/systemDir";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: User[]
    activeUser: User | null
  }
}
