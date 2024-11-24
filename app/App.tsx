import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper"; // React Native Paper provider
import { ListScreen } from "./src/screens/ListScreen";
import { CharacterDetail } from "./src/screens/CharacterDetailScreen";
import { EpisodeDetail } from "./src/screens/EpisodeDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  console.log("Initial Route:", "List"); // Ensure this matches the intended route name

  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: "SWAPI Showcase", headerShown: false }}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetail}
          options={{ title: "Character Details" }}
        />
        <Stack.Screen
          name="EpisodeDetail"
          component={EpisodeDetail}
          options={{ title: "Episode Details" }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
