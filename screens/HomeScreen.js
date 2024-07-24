import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Platform, RefreshControl } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { GET_USER_SCORE, GET_ALL_SCORES } from "../services/services";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const [scores, setScores] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Cambia la orientación a vertical al entrar en la pantalla Home
    const lockOrientation = async () => {
      if (Platform.OS === "ios") {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      } else {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
    };

    lockOrientation();
    if(user){

      fetchScores();
    }

    return () => {
      // Desbloquea la orientación al salir de la pantalla
      ScreenOrientation.unlockAsync();
    };
  }, [user]);

  const fetchScores = async () => {
    try {
      setRefreshing(true);
      const allScores = await GET_ALL_SCORES();
      const userScores = await GET_USER_SCORE(user?.user_id);
      if(userScores == undefined || allScores == undefined){
        setScores([]);
        setUserScore([]);
      } else {
        setScores(allScores);
        setUserScore(userScores[0]); 
      }
    } catch (error) {
      console.error("Error fetching scores: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.item, item.user_id === user.user_id && styles.highlight]}
    >
      <Text>
        {index + 1}. { item?.fullName ?? item?.username}
      </Text>
      <Text>{item.maxPoints}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userScoreContainer}>
        {userScore != undefined && (
          <>
            <Text style={styles.title}>Tu puntuación</Text>
            <Text style={styles.score}>{userScore.maxPoints}</Text>
          </>
        )}
      </View>
      <View style={styles.allScoresContainer}>
        {scores != undefined && (
          <>
            <Text style={styles.title}>Tabla de puntuaciones</Text>
            <FlatList
              data={scores}
              renderItem={renderItem}
              keyExtractor={(item) => item.maxPoints.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchScores} />
              }
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userScoreContainer: {
    marginBottom: 20,
  },
  allScoresContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e90ff",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  highlight: {
    backgroundColor: "#ffe4b5",
  },
});

export default HomeScreen;
