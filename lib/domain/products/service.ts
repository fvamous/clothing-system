import { productRepository } from "./repository";
import { Prisma } from "@prisma/client";

export const productService = {
  getAll: () => {
    return productRepository.findAll();
  },

  getById: (id: string) => {
    return productRepository.findById(id);
  },

  create: (data: Prisma.ProductCreateInput) => {
    return productRepository.create(data);
  },

  update: (id: string, data: Prisma.ProductUpdateInput) => {
    return productRepository.update(id, data);
  },

  remove: (id: string) => {
    return productRepository.delete(id);
  },
};