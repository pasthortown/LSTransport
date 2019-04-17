import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocationService } from './../../../../services/CRUD/BASE/location.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { UserService } from './../../../../services/profile/user.service';

@NgModule({
   imports: [CommonModule,
             LocationRoutingModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [LocationComponent],
   providers: [
               NgbModal,
               UserService,
               LocationService
               ]
})
export class LocationModule {}