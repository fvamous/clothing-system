import {
  LayoutDashboard,
  ShoppingBag,
  Package2,
  Users,
  Settings,
  CreditCard,
  Sparkles,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Products",
    href: "/admin/products",
    icon: Package2,
  },

  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },

  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },

  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: CreditCard,
  },

  {
    title: "AI Studio",
    href: "/admin/ai",
    icon: Sparkles,
  },

  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const customerNavigation =
  [
    {
      title: "Home",
      href: "/",
    },

    {
      title: "Shop",
      href: "/products",
    },

    {
      title: "Cart",
      href: "/cart",
    },

    {
      title: "Orders",
      href: "/orders",
    },
  ];