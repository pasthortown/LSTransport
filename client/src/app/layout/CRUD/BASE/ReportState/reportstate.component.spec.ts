import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStateComponent } from './reportstate.component';

describe('ReportStateComponent', () => {
   let component: ReportStateComponent;
   let fixture: ComponentFixture<ReportStateComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ReportStateComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ReportStateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});