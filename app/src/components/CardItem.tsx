import { StyleSheet, View, Image } from "react-native";
import { getStatusEmoji } from "../utils/getStatusEmoji";
import { Card, Text } from "react-native-paper";

const placeholderImage = "https://via.placeholder.com/150"; // Placeholder for episodes

interface CardItemProps {
  item: any;
  type: "characters" | "episodes";
  onPress: () => void;
}

export const CardItem = ({ item, type, onPress }: CardItemProps) => (
  <Card style={styles.card} onPress={onPress}>
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
        {type === "characters" ? (
          <Text>Species: {item.species}</Text>
        ) : (
          <Text>Episode: {item.episode}</Text>
        )}
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
