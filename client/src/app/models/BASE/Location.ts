export class Location {
   id: number;
   coords_latitude: number;
   coords_longitude: number;
   date_time: Date;
   user_id: number;
   constructor() {
      this.coords_latitude = 0;
      this.coords_longitude = 0;
   }
}