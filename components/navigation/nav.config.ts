import { Home, ShoppingBag } from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", href: "/", icon: Home },
  { id: "catalog", href: "/catalog", icon: ShoppingBag },
] as const;