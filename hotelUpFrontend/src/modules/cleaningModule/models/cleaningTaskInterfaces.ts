import { TaskStatus } from "../../../shared/models/taskStatus";
import { CleaningType } from "./cleaningType";

export interface CreateCleaningTask {
  reservationId: string;
  realisationDate: string
  roomNumber: number;
  token: string
}

export interface CreateCleaningTaskFormProps {
  id: string;
  startDate: string;
  endDate: string;
  rooms: number[];
}

export interface CleaningTask {
  id: string;
  reservationId: string;
  realisationDate: string
  roomNumber: number;
  status: TaskStatus;
  cleaningType: CleaningType;
  cleanerId: string;
}

export interface UpdateCleaningTask {
  token: string;
  id: string;
  status: string;
}