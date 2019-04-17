import { BinnacleModule } from './binnacle.module';

describe('BinnacleModule', () => {
   let blackPageModule: BinnacleModule;

   beforeEach(() => {
      blackPageModule = new BinnacleModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});