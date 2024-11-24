import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import { fetchCharacters, fetchEpisodes } from "../api/rickandmortyapi";
import { getStatusEmoji } from "../utils/getStatusEmoji";

const placeholderImage = "https://via.placeholder.com/150"; // Placeholder for episodes

export const ListScreen = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<"characters" | "episodes">("characters");
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadData = async (newType: "characters" | "episodes", page: number) => {
    setLoading(true);
    try {
      const result =
        newType === "characters"
          ? await fetchCharacters(page)
          : await fetchEpisodes(page);
      setData((prevData) =>
        page === 1 ? result.results : [...prevData, ...result.results]
      );
      console.log("data", result);

      setHasNextPage(result.info.next !== null);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData(type, 1);
  }, [type]);

  const handleLoadMore = () => {
    if (!loadingMore && hasNextPage) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(type, nextPage);
    }
  };

  const renderCard = ({ item }: { item: any }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <Card.Content style={styles.cardContent}>
        <Image
          source={{ uri: item.image || placeholderImage }}
          style={styles.cardImage}
        />
        <View>
          <Text variant="titleMedium">
            {item.name || `Episode: ${item.episode}`}
          </Text>
          <View style={styles.row}>
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
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={() => setType("characters")}>
          Characters
        </Button>
        <Button mode="contained" onPress={() => setType("episodes")}>
          Episodes
        </Button>
      </View>
      {/* List */}
      {loading && page === 1 ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator animating={true} size="small" />
            ) : null
          }
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
