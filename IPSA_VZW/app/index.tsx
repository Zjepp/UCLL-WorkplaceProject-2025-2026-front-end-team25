import { Link, router, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
<<<<<<< HEAD
      <Text> this is the main page. The setup is successful!</Text>
      <Pressable onPress={() => router.navigate("/multipleChoice")}>
        <Text>Multiple Choice page</Text>
      </Pressable>
=======
      <Text>this is the main page. The setup is successful!</Text>
>>>>>>> 71459f7a7c5866b2d70594fbb8629dabd31dfb0a
    </View>
  );
}
