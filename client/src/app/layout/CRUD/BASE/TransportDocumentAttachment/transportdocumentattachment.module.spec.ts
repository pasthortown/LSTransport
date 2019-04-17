import { TransportDocumentAttachmentModule } from './transportdocumentattachment.module';

describe('TransportDocumentAttachmentModule', () => {
   let blackPageModule: TransportDocumentAttachmentModule;

   beforeEach(() => {
      blackPageModule = new TransportDocumentAttachmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});