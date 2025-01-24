import { APIResponse } from "../../../shared/models/apiTypes";
import { CreateCleaningTask } from "../models/cleaningTasktypes";

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