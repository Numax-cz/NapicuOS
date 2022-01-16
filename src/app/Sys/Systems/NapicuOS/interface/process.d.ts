import { Window } from '../../../Window';
export declare interface processConstructor {
  processInterval?: { fun: () => void; time: number };
  processTitle?: string;
  Window?: Window;
  onDock?: boolean;
  iconPath?: string
}
