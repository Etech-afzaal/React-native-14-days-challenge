import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Categories() {
    const categories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Books" },
        { id: 3, name: "Clothing" },
    ];

    return (
        <View>
            {categories.map((category) => (
                <Pressable
                    key={category.id}
                    onPress={() => {
                        router.push({
                            pathname: "/categories/[id]",
                            params: {
                                id: category.id,
                                name: category.name,
                            },
                        });
                    }}
                >
                    <Text>{category.name}</Text>
                </Pressable>
            ))}
        </View>
    );
}