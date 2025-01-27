import { CleaningTask, CreateCleaningTask } from "../models/cleaningTaskTypes";

const baseUrl='http://localhost:5004/api/cleaning';

export const createCleaningTask = async({ reservationId, realisationDate, roomNumber, token }: CreateCleaningTask): Promise<any> => {
  const response = await fetch('http://localhost:5004/api/cleaning/cleaning-task', {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( { reservationId, realisationDate, roomNumber } ),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Wystąpił błąd podczas wysyłania danych');
  }

  console.log(response);
  return response.json();
};

export const getCleanerTasks = async (token: string): Promise<CleaningTask[]> => {
  const url = `${baseUrl}/cleaning-task`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const cleaningTasks = await response.json();
  console.log('tasls');
  console.log(cleaningTasks);
  return cleaningTasks;
};