import { AppConfig } from "../../../config";
import { HotelEvent, PlannedDish, RoomInformation } from "../models/informationInterfaces";

const baseUrl = `${AppConfig.backendUrl}/api/information`;

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
  console.log("obiadki", dishes);
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


export const getAvailableRooms = async (): Promise<RoomInformation[]> => {
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