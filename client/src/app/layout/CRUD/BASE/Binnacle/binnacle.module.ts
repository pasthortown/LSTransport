import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BinnacleRoutingModule } from './binnacle-routing.module';
import { BinnacleComponent } from './binnacle.component';
import { BinnacleService } from './../../../../services/CRUD/BASE/binnacle.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { TransportService } from './../../../../services/CRUD/BASE/transport.service';
import { PassengerBinacleService } from './../../../../services/CRUD/BASE/passengerbinacle.service';
import { RouteService } from './../../../../services/CRUD/BASE/route.service';
import { DriverService } from './../../../../services/CRUD/BASE/driver.service';
import { ReportService } from './../../../../services/CRUD/BASE/report.service';

@NgModule({
   imports: [CommonModule,
             BinnacleRoutingModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [BinnacleComponent],
   providers: [
               NgbModal,
               TransportService,
               PassengerBinacleService,
               RouteService,
               DriverService,
               ReportService,
               BinnacleService
               ]
})
export class BinnacleModule {}