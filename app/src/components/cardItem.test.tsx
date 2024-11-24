import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CardItem } from "./cardItem";

describe("CardItem", () => {
  const mockItem = {
    image: "https://example.com/image.jpg",
    name: "Test Character",
    status: "🟢 Alive",
    species: "Human",
    episode: "S01:E01",
    air_date: "2023-01-01",
  };

  it("renders correctly for characters", () => {
    render(<CardItem item={mockItem} type="characters" onPress={() => {}} />);

    expect(screen.getByText("Test Character")).toBeTruthy();
    expect(screen.getByText("🟢 Alive")).toBeTruthy();
    expect(screen.getByText("Species: Human")).toBeTruthy();
  });

  it("renders correctly for episodes", () => {
    const mockEpisode = {
      ...mockItem,
      name: "Test Episode",
      episode: "S01:E02",
      air_date: "2023-01-02",
    };

    render(<CardItem item={mockEpisode} type="episodes" onPress={() => {}} />);

    expect(screen.getByText("Test Episode")).toBeTruthy();
    expect(screen.getByText("Air Date: 2023-01-02")).toBeTruthy();
    expect(screen.getByText("Episode: S01:E02")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    render(
      <CardItem item={mockItem} type="characters" onPress={mockOnPress} />
    );

    const card = screen.getByTestId("card");
    expect(mockOnPress).not.toHaveBeenCalled();

    fireEvent.press(card);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
