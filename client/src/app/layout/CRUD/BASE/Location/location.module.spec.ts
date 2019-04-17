import { LocationModule } from './location.module';

describe('LocationModule', () => {
   let blackPageModule: LocationModule;

   beforeEach(() => {
      blackPageModule = new LocationModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});