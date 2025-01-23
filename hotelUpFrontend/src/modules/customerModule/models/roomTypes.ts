import { RoomStatus } from "../../../shared/models/roomStatus";
import { RoomType } from "../../../shared/models/roomTypes";

export interface Room {
  id: number;
  capacity: number;
  floor: number;
  withSpecialNeeds: boolean;
  type: RoomType;
  imageUrl: string;
}

export interface RoomProps {
  room: Room;
  startDate: string;
  endDate: string;
  roomStatus: RoomStatus;
  reservationId?: string;
}

export interface RoomActionsProps {
  roomStatus: RoomStatus;
}