import { ScrollView, View, Text, Button } from "react-native";
import { useMemo } from "react";
import { useCart } from "./context/CartContext";

export default function CartScreen() {

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeProduct,
    } = useCart();

    const total = useMemo(() => {
        return cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }, [cart]);

    return (
        <ScrollView>
            <Text>Shopping Cart</Text>

            {cart.map((item) => (
                <View key={item.id}>
                    <Text>
                        {item.name} - ${item.price} - Qty: {item.quantity}
                    </Text>

                    <Button
                        title="+"
                        onPress={() => increaseQuantity(item.id)}
                    />

                    <Button
                        title="-"
                        onPress={() => decreaseQuantity(item.id)}
                    />

                    <Button
                        title="Remove"
                        onPress={() => removeProduct(item.id)}
                    />
                </View>
            ))}

            <Text>Total: ${total}</Text>
        </ScrollView>
    );
}