"use client";

import { useEffect, useState } from "react";

export default function StatsServer() {
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div>
      <div>Products: {stats.products}</div>
      <div>Orders: {stats.orders}</div>
    </div>
  );
}