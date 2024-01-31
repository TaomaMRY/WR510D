import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importez vos écrans
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CharacterDetailsScreen from './screens/CharacterDetailsScreen';

// Initialisez les navigateurs
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Écran Home avec le navigateur de pile interne
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Accueil" component={HomeScreen} />
    <Stack.Screen name="CharacterDetails" component={CharacterDetailsScreen} />
  </Stack.Navigator>
);

// Écran Favoris avec le navigateur de pile interne
const FavoritesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Favoris" component={FavoritesScreen} />
  </Stack.Navigator>
);

// Écran principal avec la navigation par onglets
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Recherche') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            } else if (route.name === 'Favoris') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Recherche" component={SearchScreen} />
        <Tab.Screen name="Favoris" component={FavoritesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
