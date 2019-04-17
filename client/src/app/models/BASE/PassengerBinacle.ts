export class PassengerBinacle {
   id: number;
   time_start: any;
   time_end: any;
   aboard: Boolean;
   address_start_latitude: number;
   address_start_longitude: number;
   address_end_latitude: number;
   address_end_longitude: number;
   passenger_id: number;
   constructor() {
      this.address_start_latitude = 0;
      this.address_start_longitude = 0;
      this.address_end_latitude = 0;
      this.address_end_longitude = 0;
   }
}