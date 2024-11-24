import React from "react";
import { StyleSheet, FlatList, View, Image } from "react-native";

import { Text, Card, Divider } from "react-native-paper";
import { CardItem } from "../components/cardItem";
import { getStatusEmoji } from "../utils/getStatusEmoji";
import { ScrollView } from "react-native-gesture-handler";

const placeholderImage = "https://via.placeholder.com/150";

export const CharacterDetail = ({ route, navigation }: any) => {
  const { item } = route.params;

  const renderEpisodeCard = ({ item }: { item: string }) => {
    const episodeId = item.split("/").pop();
    return (
      <CardItem
        item={{ name: `Episode ${episodeId}`, episode: item }}
        type="episodes"
        onPress={() => navigation.navigate("EpisodeDetail", { episodeId })}
      />
    );
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: item.image || placeholderImage }}
        style={styles.image}
      />

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>
            {item.name}
          </Text>
          <Divider style={styles.divider} />
          <Text variant="titleSmall">
            {getStatusEmoji(item.status)} {item.status}
          </Text>
          <Text>Species: {item.species}</Text>
          <Text>Gender: {item.gender}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Location</Text>
          <Divider style={styles.divider} />
          <Text>Origin: {item.origin?.name}</Text>
          <Text>Last Location: {item.location?.name}</Text>
        </Card.Content>
      </Card>
      <Text style={[styles.sectionTitle, styles.titleOut]}>Episodes:</Text>
      <FlatList
        data={item.episode}
        keyExtractor={(episodeUrl) => episodeUrl}
        renderItem={renderEpisodeCard}
      />
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
});
