import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportDocumentComponent } from './transportdocument.component';

describe('TransportDocumentComponent', () => {
   let component: TransportDocumentComponent;
   let fixture: ComponentFixture<TransportDocumentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [TransportDocumentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TransportDocumentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});