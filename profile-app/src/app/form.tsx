import { useState } from "react";
import { ScrollView, View, TextInput, Button, TouchableOpacity, StyleSheet, Text } from "react-native";




export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Email"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={showPassword}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={{ textAlign: "right", marginRight: 10, color: "blue", fontWeight: "bold" }}>{showPassword ? "Show" : "Hide"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View>
                <Button
                    title="Register"
                    onPress={() => console.log(name, email, password, confirmPassword)}
                />
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 30,
    },

    inputContainer: {
        width: "80%",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        width: "80%",
    },

    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "80%",
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
    }


})