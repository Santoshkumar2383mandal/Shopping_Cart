import { create } from 'zustand';
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            add: (p) =>
                set({
                    cart: get().cart.some((x) => x.id === p.id) ? get().cart.map((x) =>
                        x.id === p.id ? { ...x, qty: x.qty + 1 } : x
                    ) : [...get().cart, { ...p, qty: 1 }]
                }),
            update: (id, qty) =>
                set({ cart: qty <= 0 ? get().cart.filter((x) => x.id !== id) : get().cart.map((x) => (x.id === id ? { ...x, qty: qty } : x)) }),
            remove: (id) => set({ cart: get().cart.filter((x) => x.id !== id) }),
            total: () => get().cart.reduce((a, c) => a + c.price * c.qty, 0),

            checkout: async () => {
                const res = await fetch("api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        items: get().cart,
                        total: get().cart.reduce((s, x) => s + x.price * x.qty, 0)
                    }),
                });
                if (!res.ok) throw new Error("Checkout failed");
                set({ cart: [] });

                return await res.json();
            }




        }),
        { name: "cart-storage" }
    )
)


