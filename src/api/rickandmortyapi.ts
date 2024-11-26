import axios from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchEpisodes = async (page: number, searchQuery: string = "") => {
  const response = await axios.get(
    `${API_BASE_URL}episode?page=${page}&name=${searchQuery}`
  );

  return response.data;
};

export const fetchCharacters = async (
  page: number,
  searchQuery: string = ""
) => {
  const response = await axios.get(
    `${API_BASE_URL}character?page=${page}&name=${searchQuery}`
  );

  return response.data;
};

export const fetchSpecificData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
