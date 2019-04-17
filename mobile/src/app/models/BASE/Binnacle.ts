import { PassengerBinacle } from './PassengerBinacle';

import { Report } from './Report';

export class Binnacle {
   id: number;
   start: Date;
   end: Date;
   address_start_map_latitude: number;
   address_start_map_longitude: number;
   address_end_map_latitude: number;
   address_end_map_longitude: number;
   address_start: String;
   address_end: String;
   oddometer_start: number;
   oddometer_end: number;
   price: number;
   transport_id: number;
   passenger_binacles_on_binnacle: PassengerBinacle[];
   route_id: number;
   driver_id: number;
   reports_on_binnacle: Report[];
   constructor() {
      this.passenger_binacles_on_binnacle = [];
      this.reports_on_binnacle = [];
      this.address_start_map_latitude = 0;
      this.address_start_map_longitude = 0;
      this.address_end_map_latitude = 0;
      this.address_end_map_longitude = 0;
   }
}