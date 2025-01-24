export interface CreateCleaningTask {
  id: string;
  realisationDate: string
  roomNumber: number;
}

export interface CreateCleaningTaskFormProps {
  id: string;
  startDate: string;
  endDate: string;
  rooms: number[];
}