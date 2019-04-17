import { PassengerModule } from './passenger.module';

describe('PassengerModule', () => {
   let blackPageModule: PassengerModule;

   beforeEach(() => {
      blackPageModule = new PassengerModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});