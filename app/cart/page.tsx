"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  async function checkout() {
    if (cart.length === 0) return alert("Cart kosong");

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        total,
      }),
    });

    if (res.ok) {
      clearCart();
      alert("Checkout berhasil!");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Cart kosong</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 10,
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <b>{item.name}</b>
                <p>
                  Rp {item.price} x {item.qty}
                </p>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                Hapus
              </button>
            </div>
          ))}

          <h3>Total: Rp {total}</h3>

          <button onClick={checkout}>
            Checkout
          </button>
        </>
      )}
    </main>
  );
}