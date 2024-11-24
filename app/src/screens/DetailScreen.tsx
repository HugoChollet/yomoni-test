import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Card, Text, Divider, Caption } from "react-native-paper";
import { getStatusEmoji } from "../utils/getStatusEmoji";

const placeholderImage = "https://via.placeholder.com/150";

export const DetailScreen = ({ route }: any) => {
  const { item } = route.params;

  const renderCharacterDetails = () => (
    <>
      {/* Image */}
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
    </>
  );

  const renderEpisodeDetails = () => (
    <>
      {/* Episode Info */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>
            Episode: {item.episode}
          </Text>
          <Caption style={styles.caption}>{item.name}</Caption>
        </Card.Content>
      </Card>

      {/* Air Date and Characters */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Details</Text>
          <Divider style={styles.divider} />
          <Text>Air Date: {item.air_date}</Text>
        </Card.Content>
      </Card>

      {/* Appearing Characters */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Appearing Characters</Text>
          <Divider style={styles.divider} />
          {item.characters?.map((character: string, index: number) => (
            <Text key={index}>{character}</Text>
          ))}
        </Card.Content>
      </Card>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.species ? renderCharacterDetails() : renderEpisodeDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f4f4",
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
