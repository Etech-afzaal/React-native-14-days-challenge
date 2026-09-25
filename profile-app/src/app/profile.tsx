
import { StyleSheet, View, Text, ScrollView, Image, Pressable } from "react-native";

const style = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height: 100,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
    },
    email: {
        fontSize: 20,
        fontWeight: "bold",
    },
    role: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 20,
        fontWeight: "bold",
    },
    editButton: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#3B82F6",
        color: "#fff",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        textAlign: "center",
    }
})


export default function Profile() {
    return (

        <ScrollView>
            <View style={style.container}>
                <Image source={require("../../assets/profile.png")} style={style.image} />
                <Text style={style.name}>Name: Muhammad Afzaal</Text>
                <Text style={style.email}>Email: [EMAIL_ADDRESS]</Text>
                <Text style={style.role}>Role: Software Developer</Text>
                <Text style={style.description}>Description: I am software engineer</Text>
                <Pressable style={style.editButton}><Text>Edit Profile</Text></Pressable>
            </View>
        </ScrollView>

    )
}