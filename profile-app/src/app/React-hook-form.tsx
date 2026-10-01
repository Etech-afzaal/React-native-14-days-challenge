import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from "react-native";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}




export default function ReactHookForm() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="name"
                />
                {errors.name && <Text style={styles.error}>This is required.</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}

                        />
                    )}
                    name="email"
                />
                {errors.email && <Text style={styles.error}>This is required.</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 6,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
                {errors.password && <Text style={styles.error}>This is required.</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "This is Afzaal",
                        },
                        minLength: 6,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="confirmPassword"
                />
                {errors.confirmPassword && <Text style={styles.error}>This is required.</Text>}
            </View>

            <Button
                title="Register"
                onPress={handleSubmit((data) => console.log(data))}
            />
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

    error: {
        color: "red",
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
    }

})  