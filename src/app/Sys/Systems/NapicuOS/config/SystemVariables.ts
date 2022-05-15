import {SystemVariablesMetadata} from "../interface/System/SystemVariables";
import {NapicuOS} from "../system.napicuos";


export const SystemVariables: SystemVariablesMetadata = {
  "%USER": () => {
    return NapicuOS.get_active_user_username()
  },
  "%USERDIR": () => {
    return NapicuOS.get_active_user_home_path() || "UNDEFINED"
  }
}


