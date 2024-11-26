import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { CardItem } from "../components/cardItem";
import { getStatusEmoji } from "../utils/getStatusEmoji";
import { ScrollView } from "react-native-gesture-handler";

const placeholderImage = "https://via.placeholder.com/150";

export const CharacterDetail = ({ route, navigation }: any) => {
  const character = route.params.item;

  return (
    <ScrollView>
      <Image
        source={{ uri: character.image || placeholderImage }}
        style={styles.image}
      />

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>
            {character.name}
          </Text>
          <Divider style={styles.divider} />
          <Text variant="titleSmall">
            {getStatusEmoji(character.status)} {character.status}
          </Text>
          <Text>Species: {character.species}</Text>
          <Text>Gender: {character.gender}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Location</Text>
          <Divider style={styles.divider} />
          <Text>Origin: {character.origin?.name}</Text>
          <Text>Last Location: {character.location?.name}</Text>
        </Card.Content>
      </Card>

      <Text style={[styles.sectionTitle, styles.titleOut]}>Episodes:</Text>
      <View style={styles.episodesContainer}>
        {character.episode.map((episodeUrl: string) => {
          const episodeId = episodeUrl.split("/").pop();
          return (
            <CardItem
              key={episodeUrl}
              item={{ name: `Episode ${episodeId}`, episode: episodeUrl }}
              type="episodes"
              onPress={() =>
                navigation.navigate("EpisodeDetail", { episodeId })
              }
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  container: {
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  titleOut: {
    paddingLeft: 16,
    color: "black",
  },
  card: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  caption: {
    textAlign: "center",
  },
  episodesContainer: {
    paddingHorizontal: 16,
  },
});
