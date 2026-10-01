import {
    createContext,
    useState,
    useContext,
    ReactNode
} from "react";




interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}
interface CartProviderProps {
    children: ReactNode;
}

interface CartContextType {
    cart: Product[];
    addProduct: (product: Product) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeProduct: (id: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<Product[]>([]);
    const addProduct = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, product];
        });
    };

    const increaseQuantity = (id: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeProduct = (id: number) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                increaseQuantity,
                decreaseQuantity,
                removeProduct,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}