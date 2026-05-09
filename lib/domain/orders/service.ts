import { orderRepository } from "./repository";
import { orderWorkflow } from "./workflow";
import { OrderStatus } from "@prisma/client";

export const orderService = {
  createOrder(data: any) {
    return orderRepository.create(data);
  },

  getOrderById(id: string) {
    return orderRepository.findById(id);
  },

  async updateStatus(id: string, nextStatus: OrderStatus) {
    const order = await orderRepository.findById(id);

    if (!order) throw new Error("Order not found");

    const current = order.status;

    if (!orderWorkflow.canTransition(current, nextStatus)) {
      throw new Error(`Invalid transition ${current} → ${nextStatus}`);
    }

    return orderRepository.updateStatus(id, nextStatus);
  },

  getAllowedActions(status: OrderStatus) {
    return orderWorkflow.getAllowedNext(status);
  },
};