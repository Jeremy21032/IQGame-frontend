import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import globalStyles from '../styles/global';
import { API_URL } from "@env";
import { GET_GAMES } from '../services/services';
import { useNavigation } from '@react-navigation/native';

const LevelCard = ({ level, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Card style={styles.card}>
        <ImageBackground  source={{ uri: `data:image/png;base64,${level.game_image}` }} style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.levelTitle}>{level.game_title}</Text>
            <Text style={styles.levelDescription}>{level.game_description}</Text>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};

const LevelScreen = () => {
  const navigation = useNavigation();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    //console.log('Navigation Prop:', navigation);
  }, [navigation]);

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = async () => {
    setLevels([])
    if (loading) return;
    setLoading(true);
    try {
      const data = await GET_GAMES();
      setLevels(data);  
    } catch (error) {
      console.error('Error fetching levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLevels();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <LevelCard
      level={item}
      onPress={() => navigation.navigate('GameScreen', { levelId: item.id })}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge" style={styles.header}>Select a Level</Text>
      <FlatList
        data={levels}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 15,
    elevation: 3,
  },
  image: {
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Un overlay más sutil
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  levelTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelDescription: {
    color: '#fff',
    fontSize: 14,
  },
  loading: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
});

export default LevelScreen;
