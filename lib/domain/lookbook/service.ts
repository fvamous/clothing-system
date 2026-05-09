import { lookbookRepository } from "./repository";

export const lookbookService = {
  getAll: () => {
    return lookbookRepository.findAll();
  },

  create: (data: any) => {
    return lookbookRepository.create(data);
  },

  remove: (id: string) => {
    return lookbookRepository.delete(id);
  },
};