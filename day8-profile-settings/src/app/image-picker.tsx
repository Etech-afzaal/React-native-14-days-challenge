import { useState } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileImageScreen() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ padding: 30, gap: 20 }}>
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                    }}
                />
            )}

            <Button title="Change Profile Photo" onPress={pickImage} />
        </View>
    );
}