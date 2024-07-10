import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GamesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Games Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamesScreen;
