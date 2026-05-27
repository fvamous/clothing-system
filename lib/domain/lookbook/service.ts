import { lookbookRepository } from "./repository";

export const lookbookService = {
  async getAll() {
    return lookbookRepository.findAll();
  },
};