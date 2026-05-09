export const orderBadgeStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return { background: "#facc15", color: "#000" };

    case "PAID":
      return { background: "#3b82f6", color: "#fff" };

    case "SHIPPED":
      return { background: "#8b5cf6", color: "#fff" };

    case "DELIVERED":
      return { background: "#22c55e", color: "#fff" };

    case "CANCELLED":
      return { background: "#ef4444", color: "#fff" };

    default:
      return { background: "#e5e7eb", color: "#000" };
  }
};