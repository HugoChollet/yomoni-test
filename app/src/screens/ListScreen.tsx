import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator, Button, Searchbar } from "react-native-paper";
import { fetchCharacters, fetchEpisodes } from "../api/rickandmortyapi";
import { CardItem } from "../components/CardItem";

export const ListScreen = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<"characters" | "episodes">("characters");
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async (
    newType: "characters" | "episodes",
    page: number,
    query: string = ""
  ) => {
    setLoading(true);
    try {
      const result =
        newType === "characters"
          ? await fetchCharacters(page, query)
          : await fetchEpisodes(page, query);
      setData((prevData) =>
        page === 1 ? result.results : [...prevData, ...result.results]
      );
      setHasNextPage(result.info.next !== null);
    } catch (error) {
      console.debug("Error loading data:", error);
      setData([]);
      setHasNextPage(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData(type, 1, searchQuery);
  }, [type, searchQuery]);

  const handleLoadMore = () => {
    if (!loadingMore && hasNextPage) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(type, nextPage);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const renderCard = ({ item }: { item: any }) => (
    <CardItem
      item={item}
      type={type}
      onPress={() => navigation.navigate("Detail", { item })}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text variant="titleMedium" style={styles.emptyText}>
        No results found
      </Text>
      <Text style={styles.emptySubText}>
        Try adjusting your search or switching the type (Characters/Episodes).
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={`Search ${
          type === "characters" ? "Characters" : "Episodes"
        }`}
        value={searchQuery}
        onChangeText={handleSearchChange}
        style={styles.searchbar}
      />
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={() => setType("characters")}>
          Characters
        </Button>
        <Button mode="contained" onPress={() => setType("episodes")}>
          Episodes
        </Button>
      </View>
      {loading && page === 1 ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={renderEmptyList}
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  searchbar: {
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  emptyText: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubText: {
    color: "gray",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
