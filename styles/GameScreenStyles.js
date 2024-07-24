import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerStyle: { backgroundColor: "white", padding: 20 },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  gameArea: {
    flex: 4,
    position: "relative",
    marginLeft:'10%'
    
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  sections: {
    flexDirection: "row",
    height: "100%",
  },
  leftSection: {
    width: "15%",
    justifyContent: "flex-end", 
    padding: 10,
    
  },
  centerSection: {
    width: "45%",
    justifyContent: "flex-end",
    padding: 10,
    
  },
  rightSection: {
    width: "20%",
    justifyContent: "flex-end",
    padding: 10,
    
  },
  itemContainer: {
    marginBottom: 10,
  },
  characterImage: {
    width: 50,
    height: 50,
  },
  characterOnBoatImage: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 60, 
  },
  boatContainer: {
    position: "absolute",
    bottom: 10,
  },
  boatImage: {
    width: 100,
    height: 100,
  },
  controlPanel: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
  },
  timer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  timerText: {
    fontSize: 18,
  },
  modalView: {
    margin: "15%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
  },
  left: {
    left: 10,
  },
  right: {
    right: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  starImage: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
});
