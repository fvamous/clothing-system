export const lookbookWorkflow = {
  canUpload: (role?: string) => role === "ADMIN",
  canDelete: (role?: string) => role === "ADMIN",
};