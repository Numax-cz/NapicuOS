import { SystemDrives } from '../interface/SystemDrives';
import { NapicuOS } from '../Sys/Systems/NapicuOS/system.napicuos';
//TODO
//? Samsung - Main System
//? IBM - Low graphic interface operating system
//? Segate - No operating system

// export const NapicuOS: systemdata = {
//   boot: {
//     title: 'NapicuOS',
//     logo: '/assets/icons/icon-192x192.png',
//   },
// };

/**
 * Main disks
 */
export const drive: SystemDrives[] = [
  {
    title: 'IBM 1405 0.0075 GB',
    data: {},
  },
  {
    title: 'Seagate ST-225 0.021 GB',
    data: {
      system: [new NapicuOS()],
    },
  },
  {
    title: 'Samsung 860 EVO M.2 1TB',
    data: {},
  },
];
