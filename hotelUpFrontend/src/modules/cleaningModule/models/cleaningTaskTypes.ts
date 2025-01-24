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