import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SystemWindowAppInjectData} from "../../interface/Window/Window";
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {SystemVector2fUpscale} from "../../scripts/Vector2fUpscale";
import {Vector2f} from "../../interface/Vector2f";

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
  public lineWidth: number = 10;


  constructor() { }

  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    this.canvas.nativeElement.removeEventListener("mousedown", this.startDraw);
    this.canvas.nativeElement.removeEventListener("mouseup", this.stopDraw);
    this.canvas.nativeElement.removeEventListener("mousemove", this.draw);
  }

  ngAfterViewInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext("2d");
    this.canvas.nativeElement.width = 1920;
    this.canvas.nativeElement.height = 1080;

    this.canvas.nativeElement.addEventListener("mousedown", this.startDraw);
    this.canvas.nativeElement.addEventListener("mouseup", this.stopDraw);
    this.canvas.nativeElement.addEventListener("mousemove", this.draw);
  }

  public startDraw = (): void => {
    this.painting = true;
  }

  public stopDraw = (): void => {
    this.painting = false;
  }

  public draw = (e: MouseEvent): void => {
    if(!this.painting || !this.canvasCtx) return;

    let pos: Vector2f = SystemVector2fUpscale(e.offsetX, e.offsetY, this.windowContent.nativeElement.offsetWidth, this.windowContent.nativeElement.offsetHeight, 1920, 1080);
    console.log(pos);
    this.canvasCtx.lineWidth = this.lineWidth;
    this.canvasCtx.lineCap = "round";
    this.canvasCtx.lineTo(pos.x, pos.y);

    this.canvasCtx.stroke();
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(pos.x, pos.y);

  }

}
