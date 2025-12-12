import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 0,
  },
  hangmanArray: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  hangmanLetter: {
    width: 10,
  },
  title: {
    position: "absolute",
    top: 100,
    marginBottom: 70,
    fontSize: 24,
    textAlign: "center",
  },
});
