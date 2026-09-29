import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CategoryDetails() {
    const { id, name } = useLocalSearchParams();

    return (
        <View>
            <Text>Category Details</Text>

            <Text>Category ID: {id}</Text>
            <Text>Category Name: {name}</Text>
        </View>
    );
}