import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";

export default function PostApiProductScreen() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const [createdProduct, setCreatedProduct] = useState<{
        id: number;
        title: string;
        price: number;
    } | null>(null);

    const createProduct = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    price: Number(price),
                }),
            });

            const data = await response.json();

            console.log("Created Product:", data);
            setCreatedProduct(data);
        } catch (error) {
            console.log("Failed to create product");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Create Product</Text>

            <TextInput
                style={styles.input}
                placeholder="Product title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Button title="Create Product" onPress={createProduct} />
            {createdProduct && (
                <View style={styles.result}>
                    <Text>Product Created Successfully</Text>
                    <Text>ID: {createdProduct.id}</Text>
                    <Text>Title: {createdProduct.title}</Text>
                    <Text>Price: ${createdProduct.price}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    result: {
        marginTop: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
});