export interface LookbookEntity {
  id: string;

  title?: string | null;

  imageUrl: string;

  caption?: string | null;

  category?: string | null;

  isActive: boolean;

  sortOrder: number;

  createdAt: Date;
}