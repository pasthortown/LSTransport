import { PassengerBinacleModule } from './passengerbinacle.module';

describe('PassengerBinacleModule', () => {
   let blackPageModule: PassengerBinacleModule;

   beforeEach(() => {
      blackPageModule = new PassengerBinacleModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});