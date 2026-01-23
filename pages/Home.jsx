import { useCartStore } from "../store/cartStore";

export default function Home() {
   const add = useCartStore((state) => state.add);
   const product = [{ id: "1", title: "Laptop", price: 1000 }];
   return (
      <div>
         {product.map((p) => (
            <button key={p.id} onClick={() => add(p)}>
               Add {p.title}
            </button>
         ))}
      </div>
   )
}