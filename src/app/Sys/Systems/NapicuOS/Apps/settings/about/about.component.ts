import { Component, OnInit } from '@angular/core';
import {NapicuBios} from "../../../SystemComponents/Bios";
import {NapicuOS} from "../../../system.napicuos";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  get GetCpuModel(): string {
    return NapicuBios.get_cpu_name();
  }

  get GetGpuModel(): string {
    return NapicuBios.get_gpu_name();
  }

  get GetMemSize(): string {
    return NapicuBios.get_mem_size();
  }

  get GetDeviceName(): string {
    return NapicuOS.get_hostname();
  }



}
