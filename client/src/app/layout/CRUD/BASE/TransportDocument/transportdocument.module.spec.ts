import { TransportDocumentModule } from './transportdocument.module';

describe('TransportDocumentModule', () => {
   let blackPageModule: TransportDocumentModule;

   beforeEach(() => {
      blackPageModule = new TransportDocumentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});