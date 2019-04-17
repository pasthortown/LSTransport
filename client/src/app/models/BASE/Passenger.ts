export class Passenger {
   id: number;
   phone_number: String;
   address_map_latitude: number;
   address_map_longitude: number;
   address: String;
   additional_info: String;
   user_id: number;
   constructor() {
      this.address_map_latitude = 0;
      this.address_map_longitude = 0;
   }
}