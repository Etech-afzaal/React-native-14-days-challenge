import { View, Button, Text, } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StoragePractice() {
  const router = useRouter();
  const [name, setName] = useState("");

  const saveName = async () => {
    await AsyncStorage.setItem("username", "Muhammad");
  };

  const getName = async () => {
    const savedName = await AsyncStorage.getItem("username");

    if (savedName) {
      setName(savedName);
    }
  };

  const removeName = async () => {
    await AsyncStorage.removeItem("username");
    setName("");
  };

  return (
    <View style={{ padding: 30, gap: 20 }}>
      <Text>Saved Name: {name}</Text>

      <Button title="Save Name" onPress={saveName} />

      <Button title="Read Name" onPress={getName} />

      <Button title="Remove Name" onPress={removeName} />

      <Button title="Go to Image Picker" onPress={() => router.push('/image-picker')} />

      <Button title="Go to Camera" onPress={() => router.push('/camera-open')} />

      <Button title="Go to Location" onPress={() => router.push('/location')} />

      <Button title="Go to Profile" onPress={() => router.push('/profile')} />

      <Button title="Go to Settings" onPress={() => router.push('/settings')} />
    </View>
  );
}