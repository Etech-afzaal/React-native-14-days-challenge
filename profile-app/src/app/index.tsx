import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  }
})

export default function Home() {
  console.log("Home screen rendered");
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Link
        href="/profile"
        style={styles.title}
      >
        Profile
      </Link>

    </View>
  );
}