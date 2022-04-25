import {inputMetadata} from "../interface/Apps/console";
import {ConsoleComponent, Line} from "../Apps/console/console.component";
import {ElementRef, ViewChild} from "@angular/core";
import {SYSTEM_DEFAULT_TERMINAL_PATH} from "../config/system";

export abstract class TerminalClass {
  /**
   * Current displayed path
   */
  public displayedPath: string = '~'; //TODO change dynamically
  /**
   * Command line lines
   */
  public lines: inputMetadata[] = [];
  /**
   * Current path
   */
  public activePath: string = SYSTEM_DEFAULT_TERMINAL_PATH;
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
    this.lines.push({lines: value, enteredCommand: enteredCommand});
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
  public changePath(path: string): void {
    this.activePath = path;
  }

  /**
   * Function for getting the command lines history
   */
  public getCommandLines(): inputMetadata[] {
    return this.lines;
  }

  /**
   * Function for deleting the history of console
   */
  public static deleteAllHistory(): void {
    ConsoleComponent.historyCommands = [];
  }
}