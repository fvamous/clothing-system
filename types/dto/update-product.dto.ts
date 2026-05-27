// dto/update-product.dto.ts

export type UpdateProductDTO = {
  name?: string;

  price?: number;

  stock?: number;

  category?: string;

  color?: string;

  material?: string;

  description?: string;

  imageUrl?: string;

  isDeleted?: boolean;
};