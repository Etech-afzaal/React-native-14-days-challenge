import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";

export default function DeleteApiProductScreen() {
    const [productId, setProductId] = useState("");

    const [deletedProduct, setDeletedProduct] = useState<{
        id: number;
        title: string;
        price: number;
    } | null>(null);


    const deleteProduct = async () => {
        try {
            const response = await fetch(
                `https://dummyjson.com/products/${productId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            setDeletedProduct(data);
        } catch (error) {
            console.log("Failed to delete product");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Delete Product</Text>

            <TextInput
                style={styles.input}
                placeholder="Product ID"
                value={productId}
                onChangeText={setProductId}
                keyboardType="numeric"
            />

            <Button title="Delete Product" onPress={deleteProduct} />
            {deletedProduct && (
                <View style={styles.result}>
                    <Text>Product Deleted Successfully</Text>
                    <Text>ID: {deletedProduct.id}</Text>
                    <Text>Title: {deletedProduct.title}</Text>
                    <Text>Price: ${deletedProduct.price}</Text>
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