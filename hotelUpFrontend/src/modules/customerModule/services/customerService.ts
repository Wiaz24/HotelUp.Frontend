import { APIError, APIResponse } from "../../../shared/models/apiTypes";
import { CreatedReservationData, ReservationData } from "../models/reservationTypes";
import { Room } from "../models/roomTypes";


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

export const createReservation = async ({ roomNumbers, tenantsData, startDate, endDate, token }: ReservationData): Promise<APIResponse> => {
  const response = await fetch('http://localhost:5000/api/customer/commands/create-reservation', {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( { roomNumbers, tenantsData, startDate, endDate, token } ),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Wystąpił błąd podczas wysyłania danych');
  }

  return response.json();
};

export const getUsersReservations = async (token: string): Promise<CreatedReservationData[]> => {
  console.log('here');
  let url = 'http://localhost:5000/api/customer/queries/get-users-reservations';

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
  const reservations = await response.json();
  console.log(reservations);
  return reservations;
};


export const getUsersReservationsById = async (token: string, id: string): Promise<CreatedReservationData> => {
  console.log('here');
  let url = `http://localhost:5000/api/customer/queries/get-users-reservation/${id}`;

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
  const reservation = await response.json();
  console.log(reservation);
  return reservation;
};

export const mutationGetUsersReservationsByIdWrapper = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  return getUsersReservationsById(token, id);
};

export const cancelReservation = async ({token, id }: {token: string, id: string}): Promise<any> => {
  const response = await fetch(`http://localhost:5000/api/customer/commands/cancel-reservation/${id}`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: '',
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
