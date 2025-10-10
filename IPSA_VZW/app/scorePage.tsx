
import React from "react";
import { Pressable, Text, View } from "react-native";

 const ScorePage: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Resultaten</Text>


      <Pressable>
        <Text>Score Bord</Text>
      </Pressable>

        <Text>
            19/20
        </Text>

      <Pressable>
        <Text>Foute Antwoorden</Text>
      </Pressable>

      <Pressable>
        <Text>Terug</Text>
      </Pressable>
    </View>
  );
}

export default ScorePage;
