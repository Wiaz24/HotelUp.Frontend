export interface Bill {
  accomodationPrice: string;
  additionalCosts?: AdditionalCost[];
  payments?: Payment[];
}

export interface AdditionalCost {
  taskId: string;
  price: string;
}

export interface Payment {
  amount: string;
  settlementDate: string;
}