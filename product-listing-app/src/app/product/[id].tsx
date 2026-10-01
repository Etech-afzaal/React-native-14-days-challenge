import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    category: string;
    rating: number;
    brand?: string;
    stock: number;
}

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getProductDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://dummyjson.com/products/${id}`
            );

            const data = await response.json();

            setProduct(data);
        } catch (err) {
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading product...</Text>
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

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Product not found.</Text>
            </View>
        );
    }
    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.category}>
                    {product.category}
                </Text>

                <Text style={styles.title}>
                    {product.title}
                </Text>

                <View style={styles.row}>
                    <Text style={styles.price}>
                        ${product.price}
                    </Text>

                    <Text style={styles.rating}>
                        ⭐ {product.rating}
                    </Text>
                </View>

                {product.brand && (
                    <Text style={styles.brand}>
                        Brand: {product.brand}
                    </Text>
                )}

                <Text style={styles.stock}>
                    Stock: {product.stock}
                </Text>

                <Text style={styles.sectionTitle}>
                    Description
                </Text>

                <Text style={styles.description}>
                    {product.description}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },

    image: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        backgroundColor: "#f7f7f7",
    },

    content: {
        padding: 20,
    },

    category: {
        fontSize: 14,
        color: "#777",
        textTransform: "capitalize",
        marginBottom: 8,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 14,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    price: {
        fontSize: 24,
        fontWeight: "700",
    },

    rating: {
        fontSize: 16,
        color: "#555",
    },

    brand: {
        fontSize: 15,
        color: "#555",
        marginBottom: 8,
    },

    stock: {
        fontSize: 15,
        color: "#555",
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
});