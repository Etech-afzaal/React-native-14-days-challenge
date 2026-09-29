What is React Native?
React Native lets you use React concepts and JavaScript/TypeScript to build native mobile applications.

<div>
  <p>Hello Afzaal</p>
  <button>View Profile</button>
</div>

<view>
<Text>Hello Afzaal</Text>
<Pressable>
<Text>
View Profile
</Text>
<Pressable>
</view>

React is the UI concept. React Native applie that concept to native mobile component.

React provides concept for building component-based UI, while React Native applies those concepts to build native mobile UI for Android and iOS

What does Native mean?

A native component is a UI element rendered using the capabilities of the actual platform.

<Text>Hello</Text>


<Pressable onPress= {handlePress}>
<Text>Follow</Text>
<Pressable>

<input>  ====> <TextInput>

<View>
  <Image />

  <Text>Muhammad</Text>
  <Text>user@email.com</Text>
  <Text>Software Developer</Text>

  <Pressable>
    <Text>Edit Profile</Text>
  </Pressable>
</View>

my-app/
│
├── app/        My application's screens/pages live here
├── assets/     All the images, fonts, svg icons live here
├── components/ My custom components live here
│
├── package.json       
│
└── app.json        Config for the app (name, icon, splash screen)


What is View?

View is the fundamental container component in React Native.

<Image source= "" />

<Image source = {require("../assets/Profile.png")}>


require() tells react native to load local asset.

<ScrollView>
ScrollView is a container that allows its content to scroll when the content is larger than the device screen.

<ScrollView>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
</ScrollView>


<ScrollView>

  <View>
    <Image source={...} />
    <Text>Muhammad</Text>
    <Text>Developer</Text>
  </View>

  <View>
    <Text>About Me</Text>
    <Text>My description...</Text>
  </View>

</ScrollView>

<SafeAreaView>
<ScrollView>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
</ScrollView>
</SafeAreaView> 

Pressable = an interactive container that responds to user presses, commonly through onPress

Are Expo and React Native the same thing?
No. Expo uses/works with React Native and provides tooling around React Native development.

What is Stack Navigation?

Think of a stack of cards.
When you open a new screen, it is placed on top of the previous screen.

What are Tabs?

Tabs let users switch between the main sections of an application.

Stack
Stack represents a navigation journey:
Home
 ↓
Products
 ↓
Product Details
You go deeper into the application and can go back.

Tabs
Tabs represent main sections:

You're switching between major areas rather than simply going deeper.

A real app often uses both.

For Product App, conceptually:
          Bottom Tabs
              │
     ┌────────┼────────┐
     ↓        ↓        ↓
   Home    Products   Profile
              │
              ↓
       Product Details

Folder structure
Expo Router commonly uses a route group for tabs:

app/
├── _layout.tsx
│
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── products.tsx
    └── profile.tsx

app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs />;
}

What does (tabs) mean?
Notice the parentheses:

route.push

route.replace

route.back()