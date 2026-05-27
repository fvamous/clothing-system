import { Prisma } from "@prisma/client";

import { productRepository } from "./repository";

import { NotFoundError } from "@/lib/errors/NotFoundError";

export const productService = {
  async getAll() {
    return productRepository.findAll();
  },

  async getById(id: string) {
    const product =
      await productRepository.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return product;
  },

  async create(data: Prisma.ProductCreateInput) {
    return productRepository.create(data);
  },

  async update(id: string, data: Prisma.ProductUpdateInput) {
    await this.getById(id);

    return productRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);

    return productRepository.remove(id);
  },
};
