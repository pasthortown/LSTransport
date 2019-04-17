import { TransportModule } from './transport.module';

describe('TransportModule', () => {
   let blackPageModule: TransportModule;

   beforeEach(() => {
      blackPageModule = new TransportModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});