import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 80,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    paddingTop: 20,
    zIndex: 2,
  },
  logo: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 410,
    height: 80,
  },
  colorBars: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1,
  },
  colorBar: {
    width: "25%",
    height: "100%",
  },
  formWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 2,
  },
  loginContainer: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 25,
    color: "#333",
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    flexDirection: "row",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 26,
    marginRight: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 2,
    borderColor: "#28A0A0",
    borderRadius: 22,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  forgotPassword: {
    color: "#333",
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  loginButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#FED57A",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  error: {
    color: "#bf1c1cff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 15,
  },
});

export { styles, loginStyles };
