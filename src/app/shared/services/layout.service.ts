import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { filter, map } from 'rxjs/operators';


@Injectable({
    providedIn: "root"
})
export class LayoutService {

    private pre_device?: string;
    private width: any;
    private device = new BehaviorSubject<any>('');
    private device$ = this.device.asObservable();

    private devicewidth = new BehaviorSubject<Number>(0);
    private devicewidth$ = this.devicewidth.asObservable();

    public subDevice() {
        return this.device.pipe(filter(i => i != ""));
    }
    public subDeviceWidth() {
        return this.devicewidth.pipe(filter(i => i != 0));
    }
    public onResize(event?: any) {
        let width = event ? event.target.innerWidth : (window ? window.innerWidth : 0);
        let change = false;
        //เดิม 568
        if (width <= 991 && this.pre_device != 'mobile') {
            this.pre_device = 'mobile'; change = true;
        } else if (width > 991 && this.pre_device != 'desktop') {
            this.pre_device = 'desktop'; change = true;
        }
        if (change) this.setDevice(this.pre_device);
        this.setDevicewidth(width)
    }
    public setDevice(device = "") {
        this.device.next(device);
    }
    public setDevicewidth(width = 0) {
        this.devicewidth.next(width);
    }

}