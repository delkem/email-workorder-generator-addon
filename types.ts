
export interface WorkOrderData {
  workOrderNumber: string;
  locationName: string;
  locationId: string;
  address: string;
  cityStateZip: string;
  problemDescription: string;
  ivrCheckInLine: string;
  accountCodePin: string;
  dsTrackingNumber: string;
  customerName: string;
}

export enum ParsingStatus {
  IDLE = 'IDLE',
  FETCHING = 'FETCHING',
  PARSING = 'PARSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GmailMessage {
  subject: string;
  sender: string;
  body: string;
  date: string;
}
