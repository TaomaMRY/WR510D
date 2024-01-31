import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Avatar, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const HomeScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [totalDisplayedCharacters, setTotalDisplayedCharacters] = useState(5);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedCharacters, setDisplayedCharacters] = useState(5);


  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { page: page },
      });
      setCharacters((prevCharacters) => [...prevCharacters, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = (character) => {
    navigation.navigate('CharacterDetails', { character });
    //addToFavorites(character); // Commentez cette ligne pour éviter de naviguer automatiquement vers les détails lors du clic
  };

  const handleLearnMore = () => {
    if (!loading) {
      setTotalDisplayedCharacters((prevTotal) => prevTotal + 10); // Vous pouvez ajuster le nombre selon vos besoins
    }
    console.log("Learn More clicked!");
  };

  const toggleFavorite = (character) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);

    if (isFavorite) {
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== character.id));
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, character]);
    }
  };

  const addToFavorites = (character) => {
    const updatedFavorites = [...favorites, character];
    setFavorites(updatedFavorites);

    navigation.navigate('FavoritesScreen', { favorites: updatedFavorites });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    fetchData();
  }, []); // Appeler fetchData une fois au montage du composant

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.cardsContainer}>
        {characters.map((character) => (
          <TouchableOpacity key={character.id} onPress={() => handleCardPress(character)}>
            <Card key={character.id} containerStyle={styles.characterCard}>
              <TouchableOpacity onPress={() => toggleFavorite(character)}>
                <Icon
                  name={favorites.some((fav) => fav.id === character.id) ? 'heart' : 'heart-outline'}
                  type="ionicon"
                  color="red"
                />
              </TouchableOpacity>
              <Avatar
                source={{ uri: character.image }}
                size="large" // Ajustez la taille selon vos préférences
                containerStyle={styles.avatarContainer}
              />
              <View style={styles.cardContent}>
                <Text style={styles.characterName} numberOfLines={1} ellipsizeMode="tail">
                  {character.name}
                </Text>
                <Text>{character.species}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        title="Voir plus"
        onPress={handleLearnMore}
        buttonStyle={styles.learnMoreButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: '2.5%',
    marginTop: '2.5%',
  },
  characterCard: {
    width: '85%', // Ajustez la largeur selon vos préférences
    height: 230,
    borderRadius: 10,
    marginBottom: '2.5%',
  },
  avatarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 1.5, // Maintient le rapport hauteur/largeur de l'image
  },
  cardContent: {
    marginTop: 10,
    alignItems: 'center',
  },
  characterName: {
    fontSize: 16, // Ajustez la taille du texte selon vos besoins
    fontWeight: 'bold',
    marginTop: 10,
  },
  learnMoreButton: {
    marginTop: 10,
    backgroundColor: 'purple',
  },
});

export default HomeScreen;
