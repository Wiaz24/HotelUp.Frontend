import { Tenant } from "./tenantTypes";

export interface ReservationData {
  roomNumbers: number[];
  tenantsData: Tenant[];
  startDate: string;
  endDate: string;
  token: string;
}