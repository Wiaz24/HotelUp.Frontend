export interface Bill {
  accommodationPrice: string;
  additionalCosts: AdditionalCost[];
  payments: Payment[];
}

export interface AdditionalCost {
  taskId: string;
  price: string;
}

export interface Payment {
  amount: string;
  settlementDate: string;
}