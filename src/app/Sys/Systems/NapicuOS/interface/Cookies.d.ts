import {UserConstructorMetadata} from "./User/User";
import {NapicuOsCookiesFileMetadata} from "./CookiesFiles";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: UserConstructorMetadata[]
    activeUser: string | null
  }
  hostname: string
  directors: string[],
  files: NapicuOsCookiesFileMetadata[],
  firstRun: boolean
}
