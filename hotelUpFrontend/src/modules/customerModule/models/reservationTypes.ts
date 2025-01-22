import { Bill } from "./billTypes";
import { Room } from "./roomTypes";
import { Tenant } from "./tenantTypes";

export interface ReservationData {
  roomNumbers: number[];
  tenantsData: Tenant[];
  startDate: string;
  endDate: string;
  token: string;
}

export interface CreatedReservationData {
  id: string[];
  status: string;
  startDate: string;
  endDate: string;
  rooms: Room[];
  bill: Bill;
  tenants: Tenant[];
}