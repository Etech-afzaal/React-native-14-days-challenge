import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Products() {
    const products = [
        { id: 1, name: "iPhone 17" },
        { id: 2, name: "MacBook Pro" },
        { id: 3, name: "AirPods Pro" },
    ];

    return (
        <View>
            {products.map((product) => (
                <Pressable
                    key={product.id}
                    onPress={() => {
                        router.push({
                            pathname: "/products/[id]",
                            params: {
                                id: product.id,
                                name: product.name,
                            },
                        });
                    }}
                >
                    <Text>{product.name}</Text>
                </Pressable>
            ))}
        </View>
    );
}