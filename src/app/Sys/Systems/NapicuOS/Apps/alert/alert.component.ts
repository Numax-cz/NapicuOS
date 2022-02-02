import {Component, Input, OnInit} from '@angular/core';
import {systemAlertTypeEnumMetadata} from "../../interface/Alert/alert";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
    /**
     * Value of the alert
     */
    @Input() public declare alertContent: string;
    /**
     * Type of the alert
     */
    @Input() public declare alertType: systemAlertTypeEnumMetadata;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.alertContent)
    }

    /**
     * Returns the alert value
     */
    get GetAlertValue(): string {
        return this.alertContent || 'undefined alert value';
    }

    /**
     * Returns the alert type
     */
    get GetAlertType(): systemAlertTypeEnumMetadata {
        return this.alertType;
    }


}
