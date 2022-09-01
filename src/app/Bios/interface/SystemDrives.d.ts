import {System} from '../../Sys/Systems/NapicuOS/SystemComponents/System';

export interface SystemDrives {
  capacity: string
  title: string;
  data: {
    system?: System[];
  };
}
