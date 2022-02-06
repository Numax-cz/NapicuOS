import {Line} from '../../../Apps/console/console.component';

export const setHelpCommand: Line = new Line(
  `Options:
    windowtitle - Sets the terminal name`
);

export const setWindowTitleHelpCommand: Line = new Line(
  `Usage: set windowtitle <pid> <new_title>`
);
