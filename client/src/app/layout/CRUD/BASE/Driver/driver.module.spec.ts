import { DriverModule } from './driver.module';

describe('DriverModule', () => {
   let blackPageModule: DriverModule;

   beforeEach(() => {
      blackPageModule = new DriverModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});