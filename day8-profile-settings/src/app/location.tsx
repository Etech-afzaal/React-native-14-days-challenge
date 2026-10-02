import { useState } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";

export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const getLocation = async () => {
        const { status } =
            await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            return;
        }

        const currentLocation =
            await Location.getCurrentPositionAsync({});

        setLocation(currentLocation);
    };

    return (
        <View style={{ padding: 30, gap: 20 }}>
            <Button title="Get My Location" onPress={getLocation} />

            {location && (
                <>
                    <Text>
                        Latitude: {location.coords.latitude}
                    </Text>

                    <Text>
                        Longitude: {location.coords.longitude}
                    </Text>
                </>
            )}
        </View>
    );
}