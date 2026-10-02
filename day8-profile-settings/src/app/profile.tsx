import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
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
    const saveProfile = async () => {
        const profile = {
            name,
            email,
            phone,
            image,
        };

        await AsyncStorage.setItem(
            "userProfile",
            JSON.stringify(profile)
        );
        console.log(profile)

    };

    const removeProfile = async () => {
        await AsyncStorage.removeItem("userProfile");
        setName("");
        setEmail("");
        setPhone("");
        setImage(null);
    };

    const loadProfile = async () => {
        const savedProfile =
            await AsyncStorage.getItem("userProfile");

        if (savedProfile) {
            const profile = JSON.parse(savedProfile);

            setName(profile.name || "");
            setEmail(profile.email || "");
            setPhone(profile.phone || "");
            setImage(profile.image || null);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
                <View style={styles.avatarRing}>
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarIcon}>👤</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.changePhotoBtn}
                    onPress={pickImage}
                    activeOpacity={0.7}
                >
                    <Text style={styles.changePhotoText}>
                        📷  Change Profile Image
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Personal Info</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputIcon}>👤</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#aaa"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputIcon}>✉️</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#aaa"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputIcon}>📱</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone"
                            placeholderTextColor="#aaa"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveProfile}
                activeOpacity={0.8}
            >
                <Text style={styles.saveBtnText}>Save Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.clearBtn}
                onPress={removeProfile}
                activeOpacity={0.8}
            >
                <Text style={styles.clearBtnText}>Clear Profile Data</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6fa",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },

    // Avatar
    avatarSection: {
        alignItems: "center",
        marginBottom: 28,
        marginTop: 10,
    },
    avatarRing: {
        width: 132,
        height: 132,
        borderRadius: 66,
        borderWidth: 3,
        borderColor: "#5e72e4",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#e8ecf4",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarIcon: {
        fontSize: 44,
    },
    changePhotoBtn: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: "#eef0fb",
    },
    changePhotoText: {
        color: "#5e72e4",
        fontSize: 14,
        fontWeight: "600",
    },

    // Card
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2d3748",
        marginBottom: 18,
    },

    // Inputs
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#718096",
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f7f8fc",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        paddingHorizontal: 14,
    },
    inputIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: "#2d3748",
    },

    // Buttons
    saveBtn: {
        backgroundColor: "#5e72e4",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#5e72e4",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    clearBtn: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#e53e3e",
    },
    clearBtnText: {
        color: "#e53e3e",
        fontSize: 16,
        fontWeight: "600",
    },
});