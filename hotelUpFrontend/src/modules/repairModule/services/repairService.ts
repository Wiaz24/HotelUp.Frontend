import { AppConfig } from "../../../config";
import { CreateRepairTask, RepairTask } from "../models/repairTaskInterfaces";

const baseUrl = `${AppConfig.backendUrl}/api/repair`;

export const getRepairTasks = async (token: string): Promise<RepairTask[]> => {
  const url = `${baseUrl}/tasks`;
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
  const repairTasks = await response.json();
  console.log('tasls');
  console.log(repairTasks);
  return repairTasks;
};

export const createRepairTask = async({ title, reservationId, description, roomNumber, deadline, token }: CreateRepairTask): Promise<any> => {
  const url = `${baseUrl}/tasks`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({title, reservation_id: reservationId, description, room_number: roomNumber.toString(), deadline }).toString()
  });

  console.log('jo');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Wystąpił błąd podczas wysyłania danych');
  }

  console.log(response);
  return response.json();
};