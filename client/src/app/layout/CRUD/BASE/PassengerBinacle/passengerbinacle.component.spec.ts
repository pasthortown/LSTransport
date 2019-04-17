import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerBinacleComponent } from './passengerbinacle.component';

describe('PassengerBinacleComponent', () => {
   let component: PassengerBinacleComponent;
   let fixture: ComponentFixture<PassengerBinacleComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [PassengerBinacleComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(PassengerBinacleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});