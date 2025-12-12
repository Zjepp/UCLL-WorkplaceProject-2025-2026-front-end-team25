import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  hangmanLetter: {
    margin: "5%",
  },
  title: {
    marginTop: 40,
    marginBottom: 70,
    fontSize: 24,
    width: "95%",
    textAlign: "center",
  },
});
