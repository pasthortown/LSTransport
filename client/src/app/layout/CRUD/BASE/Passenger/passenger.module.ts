import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerComponent } from './passenger.component';
import { PassengerService } from './../../../../services/CRUD/BASE/passenger.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { UserService } from './../../../../services/profile/user.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             PassengerRoutingModule,
             CKEditorModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [PassengerComponent],
   providers: [
               NgbModal,
               UserService,
               PassengerService
               ]
})
export class PassengerModule {}