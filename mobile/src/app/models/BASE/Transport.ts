import { TransportDocument } from './TransportDocument';

export class Transport {
   id: number;
   plate: String;
   transport_documents_on_transport: TransportDocument[];
   constructor() {
      this.transport_documents_on_transport = [];
   }
}