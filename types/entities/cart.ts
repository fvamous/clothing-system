export type CartItem = {
  id: string;

  productId: string;

  slug: string;

  name: string;

  price: number;

  imageUrl?: string | null;

  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type AddToCartPayload = {
  productId: string;

  slug: string;

  name: string;

  price: number;

  imageUrl?: string | null;

  quantity?: number;
};