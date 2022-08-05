import {UserConstructorMetadata} from "./User/User";
import {NapicuOsCookiesFileMetadata} from "./CookiesFiles";
import {SystemTimeFormatEnumMetadata} from "../config/TimeFormat";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: UserConstructorMetadata[]
    activeUser: string | null
  }
  hostname: string
  directorys: string[],
  files: NapicuOsCookiesFileMetadata[],
  time:{
    format: SystemTimeFormatEnumMetadata,
    auto_sync_time: boolean
  }

}
