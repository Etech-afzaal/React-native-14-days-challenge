import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ToastAndroid
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import Toast from 'react-native-toast-message';


const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Login successful!',
            text2: 'Welcome back 👋'
        });
    }

    const onSubmit = (data: LoginFormData) => {
        console.log(data);

        // ToastAndroid.show(
        //     "Login successful!",
        //     ToastAndroid.SHORT
        // );

        showToast();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                    />

                    {errors.email && (
                        <Text style={styles.error}>
                            {errors.email.message}
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                            />
                        )}
                    />

                    {errors.password && (
                        <Text style={styles.error}>
                            {errors.password.message}
                        </Text>
                    )}

                    <Button
                        title="Login"
                        onPress={handleSubmit(onSubmit)}
                    />
                    <Link href="/form-with-zod">
                        Don't have an account? Register
                    </Link>
                </View>
            </ScrollView>
            <Toast />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },

    container: {
        padding: 20,
        gap: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
    },

    error: {
        color: "red",
        fontSize: 13,
    },
});