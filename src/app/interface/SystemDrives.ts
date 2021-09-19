import { systemdata } from "./System";

export interface SystemDrives {
  title: string;
  data: System; //TODO add ?
}
//TODO Add more items
export interface System {
  system?: systemdata[];
}
