import { DocumentType } from "./documentTypes";
import { ReservationStatus } from "./reservationStatus";

export interface Tenant {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pesel: string;
  documentType: DocumentType;
  status: ReservationStatus;
}