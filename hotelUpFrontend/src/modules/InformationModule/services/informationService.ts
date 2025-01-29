import { HotelEvent, PlannedDish } from "../models/informationInterfaces";

const baseUrl = 'http://localhost:5003/api/information'

export const getPlannedDishes = async (): Promise<PlannedDish[]> => {
  const url = `${baseUrl}/planned-dish`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const dishes = await response.json();
  console.log(dishes);
  return dishes;
};

export const getHotelEvents = async (): Promise<HotelEvent[]> => {
  const url = `${baseUrl}/hotel-event`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const events = await response.json();
  console.log(events);
  return events;
};


export const getAvailableRooms = async (): Promise<HotelEvent[]> => {
  const url = `${baseUrl}/room-information`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const rooms = await response.json();
  console.log(rooms);
  return rooms;
};