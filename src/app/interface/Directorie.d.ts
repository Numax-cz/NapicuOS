import {FlashInformation} from './FlashInformation';

export interface Drives {
    title: string;
    description: string;
    dir: directories[];
}

export interface directories {
    title: string;
    biosFile?: FlashInformation;
    noEnter?: true;
    dir?: directories[];
}
