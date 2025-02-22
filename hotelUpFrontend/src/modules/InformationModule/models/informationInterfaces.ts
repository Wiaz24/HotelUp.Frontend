export interface PlannedDish {
  name: string;
  imageUrl: string;
  servingDate: string;
}

export interface HotelEvent {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface RoomInformation {
  number: number;
  capacity: number;
  withSpecialNeeds: boolean;
  imageUrl: string;
}