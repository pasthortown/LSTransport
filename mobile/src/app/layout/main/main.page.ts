import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  appName = environment.app_name;

  constructor() { }

  ngOnInit() {
  }

  address_mapEvent(event) {
    /*this.passengerSelected.address_map_latitude = event.coords.lat;
    this.passengerSelected.address_map_longitude = event.coords.lng;*/
    console.log(event);
 }
}
