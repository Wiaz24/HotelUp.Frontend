import { AppConfig } from "../../../config";
import { APIError } from "../../../shared/models/apiTypes";
import { CleaningTask, CreateCleaningTask, UpdateCleaningTask } from "../models/cleaningTaskInterfaces";

const baseUrl = `${AppConfig.backendUrl}/api/cleaning`;

export const createCleaningTask = async({ reservationId, realisationDate, roomNumber, token }: CreateCleaningTask): Promise<any> => {
  const url = `${baseUrl}/cleaning-task`;
  const response = await fetch(url, {
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

export const getCleaningTaskById = async (token: string, id: string): Promise<CleaningTask> => {
  const url = `${baseUrl}/cleaning-task/${id}`;
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
  const cleaningTask = await response.json();
  console.log('tasl');
  console.log(cleaningTask);
  return cleaningTask;
};

export const updateCleaningTaskStatus = async ({ token, id, status  }: UpdateCleaningTask): Promise<any> => {
  const url = new URL(`${baseUrl}/cleaning-task/${id}`);
  url.searchParams.append('Status', status);
  const response = await fetch(url.href, {
    method: 'PUT',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: APIError = await response.json();
    console.log(errorData);
    throw {
      message: errorData.Message || "Wystąpił błąd podczas wysyłania danych",
      code: errorData.Error || "Nieznany błąd",
    };
  }
  return null;
};