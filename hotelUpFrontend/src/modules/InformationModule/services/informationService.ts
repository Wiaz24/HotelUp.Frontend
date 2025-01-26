import { HotelEvent, PlannedDish } from "../models/informationInterfaces";

export const getPlannedDishes = async (): Promise<PlannedDish[]> => {
  console.log('here');
  let url = 'http://localhost:5003/api/information/planned-dish';

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
  console.log('here');
  let url = 'http://localhost:5003/api/information/hotel-event';

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

