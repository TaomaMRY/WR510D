// FavoritesScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Avatar, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = ({ route }) => {
    const { favorites } = route.params || { favorites: [] };
    const navigation = useNavigation();

  const handleCardPress = (character) => {
    navigation.navigate('CharacterDetails', { character });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.cardsContainer}>
      <Text>Favoris</Text>
      {favorites.map((character) => (
          <Card key={character.id} containerStyle={styles.characterCard}>
            <Avatar
              source={{ uri: character.image }}
              size="xlarge"
              containerStyle={styles.avatarContainer}
            />
            <View style={styles.cardContent}>
              <Text style={styles.characterName}>{character.name}</Text>
              <Text>{character.species}</Text>
            </View>
          </Card>
      ))}
    </View>

    </ScrollView>
  );
};

const styles = {
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: '2.5%',
  },
  characterCard: {
    width: '45%',
    height: 255,
    margin: '2.5%',
    borderRadius: 10,
  },
  avatarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    marginTop: 10,
    alignItems: 'center',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
};

export default FavoritesScreen;
