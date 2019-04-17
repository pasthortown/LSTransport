import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassengerBinacleRoutingModule } from './passengerbinacle-routing.module';
import { PassengerBinacleComponent } from './passengerbinacle.component';
import { PassengerBinacleService } from './../../../../services/CRUD/BASE/passengerbinacle.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { PassengerService } from './../../../../services/CRUD/BASE/passenger.service';

@NgModule({
   imports: [CommonModule,
             PassengerBinacleRoutingModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [PassengerBinacleComponent],
   providers: [
               NgbModal,
               PassengerService,
               PassengerBinacleService
               ]
})
export class PassengerBinacleModule {}