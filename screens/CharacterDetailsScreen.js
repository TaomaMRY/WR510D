import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterDetailsScreen = ({ route }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <Text style={styles.characterName}>{character.name}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Origin: {character.origin.name}</Text>
      <Text>Location: {character.location.name}</Text>
      {/* Ajoutez d'autres informations sur le personnage si nécessaire */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CharacterDetailsScreen;
