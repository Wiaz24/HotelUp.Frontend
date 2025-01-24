import { DocumentType } from "./documentTypes";
import { TenantStatus } from "./tenantStaus";

export interface Tenant {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pesel: string;
  documentType: DocumentType;
  status: TenantStatus;
}