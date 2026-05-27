import type { Prisma } from "@prisma/client";

import { orderRepository } from "./repository";

export const orderService = {
  async getAll() {
    return orderRepository.findAll();
  },

  async create(
    data: Prisma.OrderCreateInput
  ) {
    return orderRepository.create(
      data
    );
  },
};