import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Modal } from "react-native-paper";
import backgroundImage from "../assets/background.png";
import wolfImage from "../assets/wolf.png";
import goatImage from "../assets/goat.png";
import cabbageImage from "../assets/cabbage.png";
import farmerBoatImage from "../assets/farmer_boat.png";
import { SAVE_SCORE } from "../services/services";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import styles from '../styles/GameScreenStyles';

const GameScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pauseModalVisible, setPauseModalVisible] = useState(false);
  const [endGameModalVisible, setEndGameModalVisible] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();

  const [positions, setPositions] = useState({
    wolf: "left",
    goat: "left",
    cabbage: "left",
    boat: "left",
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Bloquea la orientación en modo horizontal
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      // Desbloquea la orientación al salir de la pantalla
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    setPauseModalVisible(!pauseModalVisible);
  };

  const resetGame = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
    setIsPaused(true);
    setPositions({
      wolf: "left",
      goat: "left",
      cabbage: "left",
      boat: "left",
    });
    setSelected(null);
    setEndGameModalVisible(false);
  };

  const moveBoat = () => {
    const newBoatPosition = positions.boat === "left" ? "right" : "left";
    const newPositions = {
      ...positions,
      boat: newBoatPosition,
    };

    if (selected) {
      newPositions[selected] = newBoatPosition;
    }

    if (
      (newPositions.wolf === newPositions.goat &&
        newPositions.boat !== newPositions.wolf) ||
      (newPositions.goat === newPositions.cabbage &&
        newPositions.boat !== newPositions.goat)
    ) {
      alert("¡Regla violada! Reiniciando el juego.");
      resetGame();
      return;
    }

    // Mueve el elemento adicional a la sección derecha si el bote está a la derecha
    if (newBoatPosition === "right" && selected) {
      setTimeout(() => {
        setPositions((prevPositions) => {
          const updatedPositions = {
            ...prevPositions,
            [selected]: "right",
          };

          // Verifica si todos los elementos están en la derecha
          if (updatedPositions.wolf === "right" &&
              updatedPositions.goat === "right" &&
              updatedPositions.cabbage === "right") {
            setEndGameModalVisible(true);
            SAVE_SCORE(user.user_id, timer);
          }

          return updatedPositions;
        });
      }, 1000); // Puedes ajustar el tiempo de la animación según sea necesario
    }

    setPositions(newPositions);
    setSelected(null);
  };

  const selectItem = (item) => {
    setSelected(item);
    //console.log(`${item}: `, positions[item]);
    if (positions[item] === "boat") {
      setPositions({
        ...positions,
        [item]: "left",
      });
    } else if (positions[item] === "left") {
      const itemsOnBoat = Object.values(positions).filter(pos => pos === 'boat').length;
      if (itemsOnBoat === 1) {
        alert("Solo un elemento puede estar en el bote a la vez");
        return;
      }
      setPositions({
        ...positions,
        [item]: "boat",
      });
    } else if (positions[item] === "right") {
      setPositions({
        ...positions,
        [item]: 'boat',
      });
    } else {
      setSelected(selected === item ? null : item);
    }
   // console.log(`${item} selected`);
  };

  const saveScoreAndExit = async () => {
    try {
      const data = await SAVE_SCORE(user.user_id, timer);
      //console.log("Data resultante: ", data);
      // Aquí puedes redirigir al usuario o realizar otras acciones
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.gameArea}>
        <View style={styles.sections}>
          <View style={styles.leftSection}>
            {positions.wolf === "left" && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => selectItem("wolf")}
              >
                <Image source={wolfImage} style={styles.characterImage} />
              </TouchableOpacity>
            )}
            {positions.goat === "left" && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => selectItem("goat")}
              >
                <Image source={goatImage} style={styles.characterImage} />
              </TouchableOpacity>
            )}
            {positions.cabbage === "left" && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => selectItem("cabbage")}
              >
                <Image source={cabbageImage} style={styles.characterImage} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.centerSection}>
            {positions.wolf === "boat" && (
              <Image source={wolfImage} style={styles.characterOnBoatImage} />
            )}
            {positions.goat === "boat" && (
              <Image source={goatImage} style={styles.characterOnBoatImage} />
            )}
            {positions.cabbage === "boat" && (
              <Image source={cabbageImage} style={styles.characterOnBoatImage} />
            )}
            <TouchableOpacity
              style={[
                styles.boatContainer,
                positions.boat === "left" ? styles.left : styles.right,
              ]}
              onPress={() => {
                if (positions.boat === "left" && selected) {
                  setPositions({
                    ...positions,
                    [selected]: "left",
                  });
                  setSelected(null);
                }
              }}
              disabled={positions.boat !== "left"}
            >
              <Image source={farmerBoatImage} style={styles.boatImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.rightSection}>
            {positions.wolf === "right" && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => selectItem("wolf")}
              >
                <Image source={wolfImage} style={styles.characterImage} />
              </TouchableOpacity>
            )}
            {positions.goat === "right" && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => selectItem("goat")}
              >
                <Image source={goatImage} style={styles.characterImage} />
              </TouchableOpacity>
            )}
            {positions.cabbage === "right" && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => selectItem("cabbage")}
              >
                <Image source={cabbageImage} style={styles.characterImage} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>ℹ️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={moveBoat}>
          <Text style={styles.buttonText}>⬆️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => togglePause()}>
          <Text style={styles.buttonText}>⏸️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timer}>
        <Text style={styles.timerText}>Time: {timer}s</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Rules of the game...</Text>
          <Text style={styles.modalText}>
            1. Only the farmer can move the boat.
          </Text>
          <Text style={styles.modalText}>
            2. The goat cannot be left with the cabbage.
          </Text>
          <Text style={styles.modalText}>
            3. The wolf cannot be left with the goat.
          </Text>
          <Button
            title="Close"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>

      <Modal
        visible={pauseModalVisible}
        onDismiss={() => {
          setPauseModalVisible(!pauseModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Pause Menu</Text>
          <Button title="Resume" onPress={togglePause} />
          <Button title="Exit" onPress={() => saveScoreAndExit()} />
        </View>
      </Modal>

      <Modal
        visible={endGameModalVisible}
        onDismiss={() => {
          setEndGameModalVisible(!endGameModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Fin del juego</Text>
          <Text style={styles.modalText}>¡Felicidades! Has completado el juego.</Text>
          <Button title="OK" onPress={saveScoreAndExit} />
        </View>
      </Modal>
    </View>
  );
};

export default GameScreen;
