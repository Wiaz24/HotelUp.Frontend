import { DocumentType } from "./documentTypes";
import { TenantStatus } from "./tenantStatus";

export interface Tenant {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pesel: string;
  documentType: DocumentType;
  status: TenantStatus;
}