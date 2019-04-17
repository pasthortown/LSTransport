import { AccountRolAssigmentModule } from './accountrolassigment.module';

describe('AccountRolAssigmentModule', () => {
   let blackPageModule: AccountRolAssigmentModule;

   beforeEach(() => {
      blackPageModule = new AccountRolAssigmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});