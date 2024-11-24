import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import { fetchFilms, fetchCharacters } from "../api/swapi";

export const ListScreen = ({ navigation }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (type: "films" | "characters") => {
    setLoading(true);
    const result =
      type === "films" ? await fetchFilms() : await fetchCharacters();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData("films");
  }, []);

  const renderCard = ({ item }: { item: any }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Detail", { item })}
    >
      <Card.Content>
        <Text variant="titleMedium">{item.title || item.name}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button mode="contained" onPress={() => loadData("films")}>
          Films
        </Button>
        <Button mode="contained" onPress={() => loadData("characters")}>
          Characters
        </Button>
      </View>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.url}
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
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
