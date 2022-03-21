import {User} from "../../../User";
import {systemDrivesMetadata} from "./FilesDirs/systemDir";
import {UserConstructorMetadata} from "./user";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: UserConstructorMetadata[]
    activeUser: string | null
  }
}
