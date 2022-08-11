import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {


  public value = this.GetVolumeValue;

  constructor() { }

  ngOnInit(): void {
  }


  get GetVolumeValue(): number{
    return 69;
  }

  public update(event: Event): void{
    console.log(this.value);
  }

}
