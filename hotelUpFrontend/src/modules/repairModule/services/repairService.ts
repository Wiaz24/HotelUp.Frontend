import { RepairTask } from "../models/repairTaskInterfaces";

const baseUrl='http://localhost:5001/api/repair';

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