import { system } from "./System";

export interface SystemDrives {
  title: string;
  data: SystemDrivesData; //TODO add ? 
}
//TODO Add more items
export interface SystemDrivesData{
  boot?: {
    system?: system[]
  }
}