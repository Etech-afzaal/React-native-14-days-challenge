import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View>
      <Text>Home Screen</Text>

      <Button
        title="View Products"
        onPress={() => router.push("/products")}
      />
      <Button
        title="View Categories"
        onPress={() => router.push("/categories")}
      />
      <Button
        title="View Profile"
        onPress={() => router.push("/profile")}
      />
    </View>
  );
}