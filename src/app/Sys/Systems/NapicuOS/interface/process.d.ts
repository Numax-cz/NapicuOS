import {ProcessWindowValueMetadata} from 'src/app/Sys/Process';

export declare interface processConstructor {
  processInterval?: { fun: () => void; time: number };
  processTitle?: string;
  Window?: ProcessWindowValueMetadata;
  multiRun?: boolean
}
