import {
    View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const registerSchema = z
    .object({
        name: z.string().min(1, "Name is required"),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Enter a valid email"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),

        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Register</Text>

                    {/* Your Controllers */}

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {errors.name && (
                        <Text style={styles.error}>
                            {errors.name.message}
                        </Text>
                    )}

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

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                            />
                        )}
                    />

                    {errors.confirmPassword && (
                        <Text style={styles.error}>
                            {errors.confirmPassword.message}
                        </Text>
                    )}

                    <Button
                        title="Register"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,

    },

    scrollView: {
        flex: 1,
    },

    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100,
    },

    container: {
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