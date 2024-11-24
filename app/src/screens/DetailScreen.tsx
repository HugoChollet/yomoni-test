import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DetailScreen = ({ route }: any) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title || item.name}</Text>
      <Text style={styles.description}>{JSON.stringify(item, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});
