import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function QuantityCounter() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="Go to Products"
        onPress={() => router.push("/products")} />

      <Button
        title="Go to Cart"
        onPress={() => router.push("/cart")} />

      <Button
        title="Register yourself"
        onPress={() => router.push("/form")} />

      <Button
        title="React Hook Form"
        onPress={() => router.push("/React-hook-form")} />


      <Button
        title="Form with Zod"
        onPress={() => router.push("/form-with-zod")} />

      <Button
        title="Login"
        onPress={() => router.push("/login")} />

      <Button
        title="Get Products From API"
        onPress={() => router.push("/api-products")} />

      <Button
        title="Post Product To API"
        onPress={() => router.push("/post-api-product")} />

      <Button
        title="Update Product To API"
        onPress={() => router.push("/put-api-product")} />

      <Button
        title="Delete Product To API"
        onPress={() => router.push("/delete-api-product")} />

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
});