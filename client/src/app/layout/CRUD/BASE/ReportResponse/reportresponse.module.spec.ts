import { ReportResponseModule } from './reportresponse.module';

describe('ReportResponseModule', () => {
   let blackPageModule: ReportResponseModule;

   beforeEach(() => {
      blackPageModule = new ReportResponseModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});