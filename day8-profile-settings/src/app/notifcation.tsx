// import { Button, View } from "react-native";
// import * as Notifications from "expo-notifications";

// export default function NotificationScreen() {
//     const requestNotificationPermission = async () => {
//         const { status } =
//             await Notifications.requestPermissionsAsync();

//         if (status !== "granted") {
//             return;
//         }

//         await Notifications.scheduleNotificationAsync({
//             content: {
//                 title: "Hello 👋",
//                 body: "Your local notification is working.",
//             },
//             trigger: null,
//         });
//     };

//     return (
//         <View style={{ padding: 30 }}>
//             <Button
//                 title="Show Notification"
//                 onPress={requestNotificationPermission}
//             />
//         </View>
//     );
// }