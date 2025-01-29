import { Bill } from "./billInterfaces";
import { Room } from "./roomInterfaces";
import { Tenant } from "./tenantInterfaces";

export interface ReservationData {
  roomNumbers: number[];
  tenantsData: Tenant[];
  startDate: string;
  endDate: string;
  token: string;
}

export interface CreatedReservationData {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  rooms: Room[];
  bill: Bill;
  tenants: Tenant[];
}