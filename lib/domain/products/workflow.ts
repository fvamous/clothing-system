export const productWorkflow = {
  canCreate: (role?: string) => role === "ADMIN",
  canEdit: (role?: string) => role === "ADMIN",
  canDelete: (role?: string) => role === "ADMIN",
};