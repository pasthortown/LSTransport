import { TransportPictureModule } from './transportpicture.module';

describe('TransportPictureModule', () => {
   let blackPageModule: TransportPictureModule;

   beforeEach(() => {
      blackPageModule = new TransportPictureModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});