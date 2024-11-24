import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import { fetchCharacters, fetchEpisodes } from "../api/rickandmortyapi";

const placeholderImage = "https://via.placeholder.com/150"; // Placeholder for episodes

export const ListScreen = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<"characters" | "episodes">("characters");

  const loadData = async (type: "characters" | "episodes") => {
    setLoading(true);
    const result =
      type === "characters" ? await fetchCharacters() : await fetchEpisodes();
    setType(type);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData("characters"); // Default to characters
  }, []);

  const getStatusEmoji = (status: string) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "🟢";
      case "dead":
        return "🔴";
      default:
        return "⚪️";
    }
  };

  const renderCard = ({ item }: { item: any }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <Card.Content style={styles.cardContent}>
        {/* Image */}
        <Image
          source={{ uri: item.image || placeholderImage }}
          style={styles.cardImage}
        />
        {/* Details */}
        <View style={styles.cardText}>
          <Text variant="titleMedium">
            {item.name || `Episode: ${item.episode}`}
          </Text>
          <View style={styles.row}>
            {/* Status */}
            {type === "characters" ? (
              <View style={styles.row}>
                <Text style={styles.statusText}>
                  {getStatusEmoji(item.status)}
                </Text>
                <Text style={styles.statusText}> {item.status}</Text>
              </View>
            ) : (
              <Text>Air Date: {item.air_date}</Text>
            )}
          </View>
          {/* Common Info */}
          {type === "characters" ? (
            <Text>Species: {item.species}</Text>
          ) : (
            <Text>Episode: {item.episode}</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={() => loadData("characters")}>
          Characters
        </Button>
        <Button mode="contained" onPress={() => loadData("episodes")}>
          Episodes
        </Button>
      </View>
      {/* List */}
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
