import { Room } from "../models/types";


export const getFreeRooms = async (startDate?: string, endDate?: string, roomType?: string, capacity?: number | null): Promise<Room[]> => {
  let url = 'http://localhost:5000/api/customer/queries/get-free-rooms';

  const params: URLSearchParams = new URLSearchParams();
  if (startDate) params.append('StartDate', startDate);
  if (endDate) params.append('EndDate', endDate);
  if (roomType) params.append('RoomType', roomType);
  if (capacity) params.append('RoomCapacity', capacity.toString());

  if (params.toString()) {
    url = `${url}?${params.toString()}`;
  }


  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const rooms = await response.json();
  console.log(rooms);
  return rooms;
};