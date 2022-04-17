import {System} from '../../Sys/Systems/NapicuOS/SystemComponents/System';

export interface SystemDrives {
  title: string;
  data: {
    system?: System[];
  };
}
