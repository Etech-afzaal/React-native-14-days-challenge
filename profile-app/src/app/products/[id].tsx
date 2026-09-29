import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetails() {
    const { id, name } = useLocalSearchParams();

    return (
        <View>
            <Text>Product Details</Text>

            <Text>Product ID: {id}</Text>
            <Text>Product Name: {name}</Text>
        </View>
    );
}