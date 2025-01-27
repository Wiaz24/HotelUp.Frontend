import { Cook } from "./cookInterfaces";
import { Dish } from "./dishInterface";

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