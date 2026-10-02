import { useState, useEffect } from "react";
import {
    View,
    Text,
    Switch,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [location, setLocation] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const login = async () => {
        await AsyncStorage.setItem("isLoggedIn", "true");
    };

    const logout = async () => {
        await AsyncStorage.removeItem("isLoggedIn");
    };

    const saveSettings = async () => {
        const settings = {
            notifications,
            location,
            darkMode,
        };

        await AsyncStorage.setItem(
            "appSettings",
            JSON.stringify(settings)
        );
    };

    const loadSettings = async () => {
        const savedSettings =
            await AsyncStorage.getItem("appSettings");

        if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            setNotifications(settings.notifications);
            setLocation(settings.location);
            setDarkMode(settings.darkMode);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    const clearSavedData = async () => {
        await AsyncStorage.multiRemove([
            "userProfile",
            "appSettings",
        ]);

        setNotifications(true);
        setLocation(true);
        setDarkMode(false);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {/* Header */}
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.subtitle}>
                Manage your app preferences
            </Text>

            {/* Preferences Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Preferences</Text>

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingIcon}>🔔</Text>
                        <View>
                            <Text style={styles.settingLabel}>
                                Notifications
                            </Text>
                            <Text style={styles.settingDesc}>
                                Receive push notifications
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{
                            false: "#e2e8f0",
                            true: "#c3dafe",
                        }}
                        thumbColor={
                            notifications ? "#5e72e4" : "#cbd5e0"
                        }
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingIcon}>📍</Text>
                        <View>
                            <Text style={styles.settingLabel}>
                                Location
                            </Text>
                            <Text style={styles.settingDesc}>
                                Allow location access
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={location}
                        onValueChange={setLocation}
                        trackColor={{
                            false: "#e2e8f0",
                            true: "#c3dafe",
                        }}
                        thumbColor={
                            location ? "#5e72e4" : "#cbd5e0"
                        }
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingIcon}>🌙</Text>
                        <View>
                            <Text style={styles.settingLabel}>
                                Dark Mode
                            </Text>
                            <Text style={styles.settingDesc}>
                                Use dark theme
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{
                            false: "#e2e8f0",
                            true: "#c3dafe",
                        }}
                        thumbColor={
                            darkMode ? "#5e72e4" : "#cbd5e0"
                        }
                    />
                </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveSettings}
                activeOpacity={0.8}
            >
                <Text style={styles.saveBtnText}>Save Settings</Text>
            </TouchableOpacity>

            {/* Account Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Account</Text>

                <TouchableOpacity
                    style={styles.accountRow}
                    onPress={login}
                    activeOpacity={0.6}
                >
                    <Text style={styles.settingIcon}>🔑</Text>
                    <Text style={styles.accountLabel}>Login Test</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity
                    style={styles.accountRow}
                    onPress={logout}
                    activeOpacity={0.6}
                >
                    <Text style={styles.settingIcon}>🚪</Text>
                    <Text style={styles.accountLabel}>Logout</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
            </View>

            {/* Danger Zone */}
            <TouchableOpacity
                style={styles.dangerBtn}
                onPress={clearSavedData}
                activeOpacity={0.8}
            >
                <Text style={styles.dangerBtnText}>
                    🗑️  Clear All Saved Data
                </Text>
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

    // Header
    heading: {
        fontSize: 30,
        fontWeight: "800",
        color: "#1a202c",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: "#a0aec0",
        marginBottom: 24,
    },

    // Card
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#a0aec0",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 14,
    },

    // Setting Rows
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    settingInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        flex: 1,
    },
    settingIcon: {
        fontSize: 22,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2d3748",
    },
    settingDesc: {
        fontSize: 13,
        color: "#a0aec0",
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: "#f0f0f5",
        marginVertical: 4,
    },

    // Account Rows
    accountRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        gap: 14,
    },
    accountLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#2d3748",
    },
    chevron: {
        fontSize: 24,
        color: "#cbd5e0",
        fontWeight: "300",
    },

    // Buttons
    saveBtn: {
        backgroundColor: "#5e72e4",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        marginBottom: 16,
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
    dangerBtn: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#e53e3e",
        marginTop: 4,
    },
    dangerBtnText: {
        color: "#e53e3e",
        fontSize: 16,
        fontWeight: "600",
    },
});