import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportDocumentAttachmentComponent } from './transportdocumentattachment.component';

describe('TransportDocumentAttachmentComponent', () => {
   let component: TransportDocumentAttachmentComponent;
   let fixture: ComponentFixture<TransportDocumentAttachmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [TransportDocumentAttachmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TransportDocumentAttachmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});