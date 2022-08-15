import {Component, OnInit} from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";

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

  get GetVolumeText(): string{
    return NapicuOS.get_language_words().other.system_volume
  }

  get GetDoNotDisturbSwitchA(): boolean{
    return NapicuOS.get_active_user_notification_receive();
  }

  public changeUserNotificationReceive(): void {
    const userConfig = NapicuOS.get_active_user()?.userSetting.notifications;
    if (userConfig) {
      userConfig.receive = !userConfig.receive;
    }
  }

  get GetDoNoDisturbText(): string {
    return NapicuOS.get_language_words().other.do_not_disturb;
  }

  public update(): void{

    NapicuOS.set_user_settings_audio_volume(NapicuOS.get_active_user()?.username, this.value / 100);
    console.log(NapicuOS.get_user_settings_audio_volume())
  }

}
