import { View, Text, Button } from "react-native";
import { useCart } from "../context/CartContext";

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        quantity: 1,
    },
    {
        id: 2,
        name: "Headphones",
        price: 200,
        quantity: 1,
    },
    {
        id: 3,
        name: "Keyboard",
        price: 100,
        quantity: 1,
    },
    {
        id: 4,
        name: "Mouse",
        price: 50,
        quantity: 1,
    },
];

export default function ProductsScreen() {

    const { addProduct } = useCart();

    return (
        <View>
            <Text>Products</Text>

            {products.map((product) => (
                <View key={product.id}>
                    <Text>
                        {product.name} - ${product.price}
                    </Text>

                    <Button
                        title="Add to Cart"
                        onPress={() => addProduct(product)}
                    />
                </View>
            ))}
        </View>
    );
}