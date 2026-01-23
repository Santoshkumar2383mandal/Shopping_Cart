import { useCartStore } from "../store/cartStore";

export default function Cart() {

    const { cart, update, remove, total, checkout } = useCartStore((state) => state);
    return (
        <div>
            {cart.map((x) => (
                <div key={x.id}>
                    {x.title} ({x.qty})
                    <button onClick={() => update(x.id, x.qty + 1)}>+</button>
                    <button onClick={() => update(x.id, x.qty - 1)}>-</button>
                    <button onClick={() => remove(x.id)}>Remove</button>
                </div>
            ))}

            <h3>Total: ${total()}</h3>
            <button onClick={checkout}>Checkout</button>
        </div>
    )
}