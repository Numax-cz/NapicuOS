import { ChoseSettings } from '../interface/ChoseSettings';
import { Save, Unsave } from '../Scripts/BiosExitMethods';
import { BiosLoadDefaults } from '../Scripts/BiosLoadDefaults';

export var Exit: ChoseSettings[] = [
  {
    title: 'Load Optimized Defaults',
    onTrue: () => {
      BiosLoadDefaults();
    },
    id: 0,
  },
  {
    title: 'Save Changes & Reset',
    onTrue: () => {
      Save();
    },
    id: 1,
  },
  {
    title: 'Discard Changes & Exit',
    onTrue: () => {
      Unsave();
    },
    id: 2,
  },
];
