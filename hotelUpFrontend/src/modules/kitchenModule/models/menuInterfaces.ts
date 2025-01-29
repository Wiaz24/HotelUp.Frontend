import { Cook } from "./cookInterfaces";
import { Dish } from "./dishInterfaces";

export interface Menu {
  cook: Cook;
  servingDate: string;
  published: boolean;
  dishes: Dish[];
}

export interface PublishMenu {
  token: string;
  servingDate: string;
}