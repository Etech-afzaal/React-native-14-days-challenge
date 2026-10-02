import { Stack } from "expo-router";

export default function RootLayout() {
  return (

    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "User Permission ..." }}
      />

      <Stack.Screen
        name="product/[id]"
        options={{ title: "Product Detail" }}
      />

    </Stack>


  );
}