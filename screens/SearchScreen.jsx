// Ajoutez l'importation manquante pour le composant Text
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native'; // Ajoutez Text ici
import { Card, Avatar } from 'react-native-elements';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}?name=${query}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching characters:', error);
    } 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search characters..."
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Rechercher" onPress={handleSearch} />

      <FlatList
        style={styles.resultsList}
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Card containerStyle={styles.characterCard}>
            <Avatar
              source={{ uri: item.image }}
              size="xlarge"
              containerStyle={styles.avatarContainer}
            />
            <View style={styles.cardContent}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text>{item.species}</Text>
              {/* Ajoutez d'autres informations sur le personnage si nécessaire */}
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultsList: {
    marginTop: 10,
  },
  characterCard: {
    width: '45%',
    borderRadius: 10,
    overflow: 'hidden',
    margin: '2.5%',
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
});

export default SearchScreen;
