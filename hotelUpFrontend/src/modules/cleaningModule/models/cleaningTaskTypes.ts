import { CleaningStatus } from "./cleaningStatus";
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
  status: CleaningStatus;
  cleaningType: CleaningType;
  cleanerId: string;
}