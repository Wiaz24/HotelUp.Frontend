import { TaskStatus } from "../../../shared/models/taskStatus";
import { RepairType } from "./repairType";

export interface RepairTask {
  id: string;
  reservation_id: string;
  created_at: string;
  last_update: string;
  repairType: RepairType;
  status: TaskStatus;
  description: string | null;
  room_number: number;
  damage_repair_cost: number;
  title: string;
  deadline: string;
  janitor_id: string | null;
}

export interface CreateRepairTaskFormProps {
  id: string;
  rooms: number[];
  endDate: string;
}

export interface CreateRepairTask {
  title: string;
  reservationId: string;
  description: string;
  roomNumber: number;
  deadline : string;
  token: string;
}
