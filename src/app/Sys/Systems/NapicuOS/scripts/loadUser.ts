import {UserConstructorMetadata} from "../interface/user";
import {User} from "../../../User";

export function loadUser(user: User): UserConstructorMetadata {
  return {
    username: user.username,
    password: user.password,
    userSetting: user.userSetting,
    permissions: user.permissions
  }
}
