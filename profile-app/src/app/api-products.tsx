import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

interface Product {
    id: number;
    title: string;
    price: number;
}

export default function ApiProductsScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "https://dummyjson.com/products"
            );

            const data = await response.json();

            setProducts(data.products);
        } catch (err) {
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>{error}</Text>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No products found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>${item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    card: {
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#03dffcff",
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
});