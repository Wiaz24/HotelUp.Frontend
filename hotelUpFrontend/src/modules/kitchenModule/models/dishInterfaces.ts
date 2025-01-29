import { Money } from "./moneyInterfaces";

export interface Dish {
  id: string;
  name: string;
  price: Money;
  imageUrl: ImageUrl;
}

export interface ImageUrl {
  value: string;
}