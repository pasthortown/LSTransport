import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportPictureComponent } from './transportpicture.component';

describe('TransportPictureComponent', () => {
   let component: TransportPictureComponent;
   let fixture: ComponentFixture<TransportPictureComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [TransportPictureComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TransportPictureComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});