import {inputMetadata} from "../interface/Apps/Console";
import {ConsoleComponent, Line} from "../Apps/console/console.component";
import {ElementRef} from "@angular/core";
import {SYSTEM_DEFAULT_TERMINAL_PATH} from "../config/System";
import {ReplaceSystemVariables} from "../scripts/ReplaceVariables";

export abstract class TerminalClass {
  /**
   * Command line lines
   */
  public lines: inputMetadata[] = [];
  /**
   * Current path
   */
  protected activePath: string = SYSTEM_DEFAULT_TERMINAL_PATH;
  /**
   * Determines if the specified command is currently running
   */
  public activeCommand: boolean = false;
  /**
   * Command line input
   */
  public declare inputValue: ElementRef;
  /**
   * Selected command from history
   */
  public selectedCommandHistory: number = 0;
  /**
   * History of commands
   */
  public static historyCommands: string[] = [];


  /**
   * Write value to the console
   * @param value
   */
  public writeLine(value: string): void {
    this.lines[this.lines.length - 1].lines = [new Line(value)];
  }

  /**
   * Creates a new line
   * @param value Array of lines to be displayed
   * @param enteredCommand The command that appears as entered
   */
  public creatCommandLine(value: Line[], enteredCommand?: string): void {
    this.lines.push({lines: value, enteredCommand: enteredCommand, path: this.activePath});
  }

  /**
   * Sets and filters commands
   * @param input Command entered
   */
  public setHistoryCommand(input: string): void {
    TerminalClass.historyCommands = TerminalClass.historyCommands.filter(
      (value: string) => {
        return value !== input;
      }
    );
    TerminalClass.historyCommands.push(input);
  }


  /**
   *  Sets the terminal path
   * @param path
   */
  public setPath(path: string): void {
    this.activePath = path;
  }

  /**
   * Function for getting the command lines history
   */
  public getCommandLines(): inputMetadata[] {
    return this.lines;
  }

  //TODO DOC
  public getPath(): string {
    return ReplaceSystemVariables(this.activePath);
  }

  /**
   * Function for deleting the history of console
   */
  public static deleteAllHistory(): void {
    ConsoleComponent.historyCommands = [];
  }
}
