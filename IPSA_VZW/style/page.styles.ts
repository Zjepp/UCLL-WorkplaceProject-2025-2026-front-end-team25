import { StyleSheet } from "react-native";

const vragenStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  scrollContent: {
    paddingBottom: 250,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginVertical: 10,
    borderRadius: 20,
  },
  vraag: {
    flex: 1,
    fontSize: 18,
    color: "#000000ff",
    marginRight: 12,
  },
  vraag2: {
    fontSize: 24,
    color: "#000000ff",
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton1: {
    backgroundColor: "#FF4928", // rood
    padding: 6,
    borderRadius: 9,
  },
  Button: {
    backgroundColor: "#FFD285", // rood
    padding: 6,
    width: "40%",
    height: "100%",
    borderRadius: 9,
    marginTop: 50,
    textAlign: "center",
  },
  iconButton2: {
    backgroundColor: "#FFD285", // oranje
    padding: 6,
    borderRadius: 9,
  },
  container2: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  terugButton: {
    backgroundColor: "#E73E07",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  terugButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },

  nieuwButton: {
    backgroundColor: "#FFD285", // rood
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: "center", // belangrijk!
    justifyContent: "center", // belangrijk!
  },

  nieuwButton2: {
    backgroundColor: "#A89BC7", // rood
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: "center", // belangrijk!
    justifyContent: "center", // belangrijk!
  },

  nieuwButtonText: {
    color: "#000000ff", // WITTE tekst
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});

const usersStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  terugButton: {
    backgroundColor: "#E73E07",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  scrollContent: {
    paddingBottom: 250,
    flexGrow: 1,
  },
  terugButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginVertical: 10,
    borderRadius: 20,
  },
  user: {
    flex: 1,
    fontSize: 18,
    color: "#000000ff",
    marginRight: 12,
  },
  user2: {
    fontSize: 24,
    color: "#000000ff",
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton1: {
    backgroundColor: "#FF4928", // rood
    padding: 6,
    borderRadius: 9,
  },
  Button: {
    backgroundColor: "#FFD285", // rood
    padding: 6,
    width: "40%",
    height: "100%",
    borderRadius: 9,
    marginTop: 50,
    textAlign: "center",
  },
  iconButton2: {
    backgroundColor: "#FFD285", // oranje
    padding: 6,
    borderRadius: 9,
  },
  container2: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nieuwButton: {
    backgroundColor: "#FFD285", // rood
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center", // belangrijk!
    justifyContent: "center", // belangrijk!
  },

  nieuwButtonText: {
    color: "#000000ff", // WITTE tekst
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
});

const scorePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#222",
    marginBottom: 50,
    fontWeight: "400",
  },
  button: {
    width: 280,
    height: 75,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "400",
    marginRight: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  scoreNumberLeft: {
    fontSize: 70,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 30,
    position: "absolute",
    right: 150,
  },
  scoreNumberRight: {
    fontSize: 70,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginHorizontal: 30,
    position: "absolute",
    left: 150,
  },
  scoreBar: {
    fontSize: 50,
    color: "#FFFFFF",
    position: "absolute",
  },
});

const quizPageStyles = StyleSheet.create({
  container: { flex: 1, position: "relative", marginTop: 35 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 12,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  done: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  link: { color: "blue", textDecorationLine: "underline" },
  heartContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 10,
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 4,
  },
});

const nieuweVraagStyles = StyleSheet.create({
  background: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  band: { flex: 1 },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  label: { fontSize: 20, color: "#222", marginBottom: 8, fontWeight: "600" },
  input: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 20,
    backgroundColor: "#ffffffff",
    marginBottom: 24,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: { fontSize: 20, color: "#222" },
  dropdownList: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    marginTop: 4,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
});

const nieuweFaqStyles = StyleSheet.create({
  background: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  band: { flex: 1 },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  label: { fontSize: 20, color: "#222", marginBottom: 8, fontWeight: "600" },
  input: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 20,
    backgroundColor: "#ffffffff",
    marginBottom: 24,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: { fontSize: 20, color: "#222" },
  dropdownList: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    marginTop: 4,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
});

const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
  },
  headerTextBox: {
    fontSize: 24,
  },
  headerTextBoxPlaats: {
    fontSize: 24,
    color: "white",
  },
  headerCounterLayout: {
    borderRadius: 7,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCounterLayoutDagen: {
    marginTop: 7,
    paddingHorizontal: 5,
    backgroundColor: "#28A0A0",
  },
  headerCounterLayoutPlaats: {
    marginTop: 7,
    paddingHorizontal: 5,
    backgroundColor: "#FF4F21",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "#ffffffff",
    marginBottom: 50,
    fontWeight: "400",
  },
  button: {
    width: 280,
    height: 75,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#B196C7",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "400",
    marginRight: 10,
  },
  buttonQuizText: {
    fontSize: 46,
    color: "white",
  },
  overzichtButton: {
    backgroundColor: "#e8bf4fff",
  },
  scoreBordButton: {
    backgroundColor: "#B196C7",
  },
  quizButton: {
    backgroundColor: "#FF4F21",
  },
  faqButton: {
    backgroundColor: "#28A0A0",
  },
});

const faqOverviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 250,
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginVertical: 10,
    borderRadius: 20,
  },
  faq: {
    flex: 1,
    fontSize: 18,
    color: "#000000ff",
    marginRight: 12,
  },

  container2: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  terugButton: {
    backgroundColor: "#E73E07",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  terugButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },

  nieuwButton: {
    backgroundColor: "#FFD285",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 30,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },

  nieuwButtonText: {
    color: "#000000ff",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },

  Faq2: {
    fontSize: 24,
    color: "#000000ff",
    textAlign: "center",
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton1: {
    backgroundColor: "#FF4928", // rood
    padding: 6,
    borderRadius: 9,
  },
  Button: {
    backgroundColor: "#FFD285", // rood
    padding: 6,
    width: "40%",
    height: "100%",
    borderRadius: 9,
    marginTop: 50,
    textAlign: "center",
  },
  iconButton2: {
    backgroundColor: "#FFD285", // oranje
    padding: 6,
    borderRadius: 9,
  },
});

const faqStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  colorBars: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1,
  },
  colorBar: { width: "25%", height: "100%" },
  headerRow: {
    zIndex: 2,
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  chatButton: { backgroundColor: "#B196C7" },
  returnButton: { backgroundColor: "#28A0A0" },
  headerButtonText: { color: "#fff", fontSize: 20 },
  title: {
    zIndex: 2,
    fontSize: 36,
    textAlign: "center",
    marginTop: 22,
    marginBottom: 12,
    color: "#222",
  },
  listWrapper: { zIndex: 2, paddingHorizontal: 18, paddingTop: 10 },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
  },
  question: { fontSize: 28, marginBottom: 8, color: "#111" },
  answer: { fontSize: 16, color: "#222" },
});

const categoryPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    backgroundColor: "#FF4F21",
    marginTop: 7,
    borderRadius: 7,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  backButtonText: {
    fontSize: 20,
    color: "#ffffffff",
    fontWeight: "500",
  },
  title: {
    fontSize: 42,
    fontWeight: "400",
    textAlign: "center",
    color: "#000000",
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 20,
    color: "#ffffffff",
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});

const wijzigVraagStyles = StyleSheet.create({
  background: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  band: { flex: 1 },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  label: { fontSize: 20, color: "#222", marginBottom: 8, fontWeight: "600" },
  input: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    marginBottom: 24,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: { fontSize: 20, color: "#222" },
  dropdownList: { borderWidth: 3, borderColor: "#1CA0A0", borderRadius: 20 },
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
});

const wijzigFaqStyles = StyleSheet.create({
  background: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  band: { flex: 1 },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "#222",
    marginBottom: 30,
    fontWeight: "400",
  },
  label: { fontSize: 20, color: "#222", marginBottom: 8, fontWeight: "600" },
  input: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    marginBottom: 24,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 3,
    borderColor: "#1CA0A0",
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: { fontSize: 20, color: "#222" },
  dropdownList: { borderWidth: 3, borderColor: "#1CA0A0", borderRadius: 20 },
  saveBtn: {
    flex: 1,
    backgroundColor: "#FFD285",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  saveBtnText: { color: "#222", fontSize: 20, fontWeight: "600" },
});

export {
  vragenStyles,
  usersStyles,
  scorePageStyles,
  quizPageStyles,
  nieuweVraagStyles,
  nieuweFaqStyles,
  indexStyles,
  faqOverviewStyles,
  faqStyles,
  categoryPageStyles,
  wijzigVraagStyles,
  wijzigFaqStyles,
};
