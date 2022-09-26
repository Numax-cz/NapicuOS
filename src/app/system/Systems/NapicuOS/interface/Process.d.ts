import {ProcessWindowValueMetadata} from 'src/app/system/Systems/NapicuOS/SystemComponents/Process';

export declare interface processConstructor {
  processInterval?: { fun: () => void; time: number };
  processTitle?: string;
  Window?: ProcessWindowValueMetadata;
  multiRun?: boolean
}
