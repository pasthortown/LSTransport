import { ReportModule } from './report.module';

describe('ReportModule', () => {
   let blackPageModule: ReportModule;

   beforeEach(() => {
      blackPageModule = new ReportModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});