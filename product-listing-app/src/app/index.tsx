import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";


interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

export default function ProductsScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("https://dummyjson.com/products");

      const data = await response.json();

      setProducts(data.products);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Something went wrong
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <Button
          title="Try Again"
          onPress={getProducts}
        />
      </View>
    );
  }
  if (filteredProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptyText}>
          Try searching with a different product name.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
            }
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.productImage}
            />

            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>

              <Text style={styles.category}>
                {item.category}
              </Text>

              <View style={styles.row}>
                <Text style={styles.price}>${item.price}</Text>

                <Text style={styles.rating}>
                  ⭐ {item.rating}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },

  productTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  category: {
    fontSize: 14,
    color: "#777",
    textTransform: "capitalize",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
  },

  rating: {
    fontSize: 14,
    color: "#555",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  errorText: {
    fontSize: 15,
    color: "#777",
    marginBottom: 16,
    textAlign: "center",
  },
});