// ================================
// DATABASE LAYER (RAW ENTITY)
// ================================
export interface ProductEntity {
  id: string;
  name: string;
  slug: string;
  price: number;

  imageUrl: string | null;
  description: string | null;

  stock: number;

  color: string | null;
  material: string | null;

  categoryId: string | null;

  createdAt: Date;
  updatedAt: Date;
}