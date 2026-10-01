import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";

export default function PutApiProductScreen() {
    const [productId, setProductId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const [updatedProduct, setUpdatedProduct] = useState<{
        id: number;
        title: string;
        price: number;
    } | null>(null);

    const updateProduct = async () => {
        try {
            const response = await fetch(
                `https://dummyjson.com/products/${productId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title,
                        price: Number(price),
                    }),
                }
            );

            const data = await response.json();

            setUpdatedProduct(data);
        } catch (error) {
            console.log("Failed to update product");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Update Product</Text>

            <TextInput
                style={styles.input}
                placeholder="Product ID"
                value={productId}
                onChangeText={setProductId}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="New title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="New price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Button title="Update Product" onPress={updateProduct} />

            {updatedProduct && (
                <View style={styles.result}>
                    <Text>Product Updated Successfully</Text>
                    <Text>ID: {updatedProduct.id}</Text>
                    <Text>Title: {updatedProduct.title}</Text>
                    <Text>Price: ${updatedProduct.price}</Text>
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