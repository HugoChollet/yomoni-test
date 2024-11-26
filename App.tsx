import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { ListScreen } from "./src/screens/ListScreen";
import { CharacterDetail } from "./src/screens/CharacterDetailScreen";
import { EpisodeDetail } from "./src/screens/EpisodeDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </PaperProvider>
  );
}
