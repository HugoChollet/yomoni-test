import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Text,
  ActivityIndicator,
  Card,
  Caption,
  Divider,
} from "react-native-paper";
import { CardItem } from "../components/cardItem";
import { fetchSpecificData } from "../api/rickandmortyapi";
import { ScrollView } from "react-native-gesture-handler";

export const EpisodeDetail = ({ route, navigation }: any) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisode = async () => {
      try {
        const data = await fetchSpecificData(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisode(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEpisode();
  }, [episodeId]);

  const RenderCharacterCard = ({
    item,
    navigation,
  }: {
    item: string;
    navigation: any;
  }) => {
    const [characterData, setCharacterData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch for each Character card
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchSpecificData(item);
          setCharacterData(data);
        } catch (error) {
          console.error("Error fetching character data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [item]);

    if (loading) {
      return <ActivityIndicator animating={true} size="small" />;
    }

    return (
      <CardItem
        item={characterData}
        type="characters"
        onPress={() =>
          navigation.navigate("CharacterDetail", { item: characterData })
        }
      />
    );
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  if (!episode) {
    return <Text>Error loading episode details</Text>;
  }

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.name}>
            {episode.name}
          </Text>
          <Caption style={styles.caption}>Episode: {episode.episode}</Caption>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Details</Text>
          <Divider style={styles.divider} />
          <Text>Air Date: {episode.air_date}</Text>
          <Text>Appearing Characters: {episode.characters.length}</Text>
        </Card.Content>
      </Card>

      <Text style={[styles.sectionTitle, styles.titleOut]}>
        Appearing Characters:
      </Text>
      <View style={styles.characterList}>
        {episode.characters.map((characterUrl: string) => (
          <RenderCharacterCard
            key={characterUrl}
            item={characterUrl}
            navigation={navigation}
          />
        ))}
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
  characterList: {
    marginHorizontal: 16,
  },
});
