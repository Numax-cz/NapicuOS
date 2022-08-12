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
    return NapicuOS.get_user_settings_audio_volume() * 100;
  }

  public update(): void{

    NapicuOS.set_user_settings_audio_volume(NapicuOS.get_active_user()?.username, this.value / 100);
    console.log(NapicuOS.get_user_settings_audio_volume())
  }

}
