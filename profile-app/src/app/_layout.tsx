import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home" }}
      />

      <Stack.Screen
        name="products/index"
        options={{ title: "Products" }}
      />

      <Stack.Screen
        name="products/[id]"
        options={{ title: "Product Details" }}
      />

      <Stack.Screen
        name="profile"
        options={{ title: "Profile" }}
      />

      <Stack.Screen
        name="settings"
        options={{ title: "Settings" }}
      />

      <Stack.Screen
        name="categories/index"
        options={{ title: "Categories" }}
      />

      <Stack.Screen
        name="categories/[id]"
        options={{ title: "Category Details" }}
      />
    </Stack>
  );
}