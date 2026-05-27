// dto/checkout.dto.ts

export type CheckoutItemDTO = {
  productId: string;

  quantity: number;
};

export type CheckoutDTO = {
  items: CheckoutItemDTO[];
};