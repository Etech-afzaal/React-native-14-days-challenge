import { useRef, useState } from "react";
import { View, Button, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
    const cameraRef = useRef<CameraView>(null);

    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <View style={{ padding: 30 }}>
                <Button
                    title="Allow Camera Permission"
                    onPress={requestPermission}
                />
            </View>
        );
    }

    const takePhoto = async () => {
        const result = await cameraRef.current?.takePictureAsync();

        if (result) {
            setPhoto(result.uri);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {!photo ? (
                <>
                    <CameraView
                        ref={cameraRef}
                        style={{ flex: 1 }}
                        facing="front"
                        mirror={true}
                    />

                    <View style={{ marginBottom: 80 }}>
                        <Button
                            title="Take Photo"
                            onPress={takePhoto}
                        />
                    </View>
                </>
            ) : (
                <>
                    <Image
                        source={{ uri: photo }}
                        style={{
                            width: "100%",
                            height: 400,
                        }}
                        resizeMode="cover"
                    />

                    <Button
                        title="Take Another Photo"
                        onPress={() => setPhoto(null)}
                    />
                </>
            )}
        </View>
    );
}