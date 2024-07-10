import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const GameCard = ({ image, title, description, price, rating }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardContentWrapper}>
        <View style={styles.cardContent}>
          <Image source={{ uri: `data:image/png;base64,${image}` }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.footer}>
              <Text style={styles.rating}>{'⭐'.repeat(rating)} {rating}sss</Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <Button mode="contained" style={styles.button}>
              Play
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 15,
  },
  cardContentWrapper: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
  },
});

export default GameCard;
