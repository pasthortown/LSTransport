import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportResponseComponent } from './reportresponse.component';

describe('ReportResponseComponent', () => {
   let component: ReportResponseComponent;
   let fixture: ComponentFixture<ReportResponseComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ReportResponseComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ReportResponseComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});