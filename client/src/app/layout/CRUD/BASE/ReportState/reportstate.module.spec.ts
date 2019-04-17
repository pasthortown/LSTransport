import { ReportStateModule } from './reportstate.module';

describe('ReportStateModule', () => {
   let blackPageModule: ReportStateModule;

   beforeEach(() => {
      blackPageModule = new ReportStateModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});