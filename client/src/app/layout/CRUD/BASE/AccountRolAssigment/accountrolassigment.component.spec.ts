import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountRolAssigmentComponent } from './accountrolassigment.component';

describe('AccountRolAssigmentComponent', () => {
   let component: AccountRolAssigmentComponent;
   let fixture: ComponentFixture<AccountRolAssigmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [AccountRolAssigmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AccountRolAssigmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});