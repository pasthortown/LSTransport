import { ReportResponse } from './ReportResponse';

export class Report {
   id: number;
   detail: String;
   user_id: number;
   report_state_id: number;
   report_responses_on_report: ReportResponse[];
   constructor() {
      this.report_responses_on_report = [];
   }
}