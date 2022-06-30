import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SystemWindowAppInjectData} from "../../interface/Window/Window";
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {SystemVector2fUpscale} from "../../scripts/Vector2fUpscale";
import {Vector2f} from "../../interface/Vector2f";
import {PaintColorsMetadata} from "../../interface/Apps/Paint";

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements OnInit, AfterViewInit, OnDestroy, SystemWindowAppInjectData {
  @Input() public declare data: InputAlertData;
  @Input() public declare windowValue: ProcessWindowValueMetadata;
  @Input() public declare process: Process;
  @Input() public declare args: string[];
  @ViewChild('NapicuCanvas') declare canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('WindowContent') declare windowContent: ElementRef<HTMLElement>;

  public canvasCtx: CanvasRenderingContext2D | null = null
  public painting: boolean = false;
  protected readonly defaultLineWidht: number = 10;
  public lineWidth: number = this.defaultLineWidht;
  public selectedColor: number = 0;
  public readonly colors: PaintColorsMetadata[] = [
    {
      color: "black",
    },
    {
      color: "gray",
    },
    {
      color: "red",
    },
    {
      color: "orange",
    },
    {
      color: "yellow",
    },
    {
      color: "green",
    },
    {
      color: "blue",
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.canvas.nativeElement.removeEventListener("mousedown", this.startDraw);
    this.canvas.nativeElement.removeEventListener("mouseup", this.stopDraw);
    this.canvas.nativeElement.removeEventListener("mousemove", this.draw);
    this.canvas.nativeElement.removeEventListener("touchend", this.stopDraw);
    this.canvas.nativeElement.removeEventListener("mouseout", this.stopDraw);
  }

  ngAfterViewInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext("2d");
    this.canvas.nativeElement.width = 1920;
    this.canvas.nativeElement.height = 1080;

    this.canvas.nativeElement.addEventListener("mousedown", this.startDraw);
    this.canvas.nativeElement.addEventListener("mouseup", this.stopDraw);
    this.canvas.nativeElement.addEventListener("mousemove", this.draw);

    this.canvas.nativeElement.addEventListener("touchend", this.stopDraw);
    this.canvas.nativeElement.addEventListener("mouseout", this.stopDraw);
  }

  public startDraw = (): void => {
    this.painting = true;
  }

  public submitLineWidthFromInput(): void {
    if (this.lineWidth == null || this.lineWidth < 1) {
      this.lineWidth = this.defaultLineWidht;
    } else if (this.lineWidth > 100) this.lineWidth = 100;
  }

  public stopDraw = (): void => {
    if (this.canvasCtx) {
      this.canvasCtx.stroke();
      this.canvasCtx.beginPath();
    }

    this.painting = false;
  }

  public selectColor(index: number): void {
    this.selectedColor = index;
  }

  public draw = (e: MouseEvent): void => {
    if (!this.painting || !this.canvasCtx) return;

    let pos: Vector2f = SystemVector2fUpscale(e.offsetX, e.offsetY, this.windowContent.nativeElement.offsetWidth, this.windowContent.nativeElement.offsetHeight, 1920, 1080);
    console.log(pos);
    this.canvasCtx.lineWidth = this.lineWidth;
    this.canvasCtx.lineCap = "round";
    this.canvasCtx.strokeStyle = this.colors[this.selectedColor].color;
    this.canvasCtx.lineTo(pos.x, pos.y);
    this.canvasCtx.stroke();
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(pos.x, pos.y);
  }

  get GetSelectedColor(): string {
    return this.colors[this.selectedColor].color;
  }
}
