import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

interface LettersProps {
  onSelect?: (letter: string) => void;
  resetKey?: string;
}

const Letters: React.FC<LettersProps> = ({ onSelect, resetKey }) => {
  const [selectedLetters, setSelectedLetters] = React.useState<string[]>([]);
  const grijs = "#404040ff";

  const paars = "#A395CA";
  const oranje = "#FF4F21";
  const blauw = "#A1C2C2";
  const geel = "#FDCE7E";

  const colors = [paars, oranje, blauw, geel]; // index 0,1,2,3

  useEffect(() => {
    setSelectedLetters([]);
  }, [resetKey]);

  const handleSelect = (letter: string) => {
    setSelectedLetters((prev) => [...prev, letter]);
    onSelect?.(letter);
  };

  // Alphabet rows
  const rij_1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rij_2 = ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
  const rij_3 = ["U", "V", "W", "X", "Y", "Z"];

  const { width } = Dimensions.get("window");
  const keyWidth = (width - 20) / 10 - 4;

  // Renders a row with a specific starting color index
  const renderRow = (letters: string[], startIndex: number) => {
    return letters.map((letter, index) => {
      const isSelected = selectedLetters.includes(letter);

      const colorIndex = (startIndex + index) % colors.length;

      const backgroundColor = isSelected ? grijs : colors[colorIndex];
      const opacity = isSelected ? 0.5 : 1;

      return (
        <Pressable
          key={letter}
          onPress={() => handleSelect(letter)}
          disabled={isSelected}
          style={[styles.key, { backgroundColor, opacity, width: keyWidth }]}
        >
          <Text style={styles.letter}>{letter}</Text>
        </Pressable>
      );
    });
  };

  // Row start colors shift backwards each row
  const row1Start = 0;
  const row2Start = 3;
  const row3Start = 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderRow(rij_1, row1Start)}</View>
      <View style={styles.row}>{renderRow(rij_2, row2Start)}</View>
      <View style={styles.row}>{renderRow(rij_3, row3Start)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 4,
    flexWrap: "wrap",
    width: "100%",
  },
  key: {
    maxWidth: "8.9%",
    borderRadius: 4,
    paddingVertical: 12,
    marginHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  letter: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default Letters;
