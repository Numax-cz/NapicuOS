export interface Drives {
  title: string;
  description: string;
  dir: directories[];
}
export interface directories {
  title: string;
  dir?: directories[];
}
