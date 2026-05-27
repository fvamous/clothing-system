// dto/create-product.dto.ts

export type CreateProductDTO = {
  name: string;

  price: number;

  stock?: number;

  category?: string;

  color?: string;

  material?: string;

  description?: string;

  imageUrl?: string;
};