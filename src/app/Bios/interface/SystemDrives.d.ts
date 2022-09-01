import {System} from '../../Sys/Systems/NapicuOS/SystemComponents/System';

export interface VM_COMPUTER_DRIVES_METADATA {
  capacity: string
  title: string;
  data: {
    system?: System[];
  };
}
