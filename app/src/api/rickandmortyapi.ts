import axios from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchEpisodes = async (page: number) => {
  const response = await axios.get(`${API_BASE_URL}episode?page=${page}`);

  return response.data;
};

export const fetchCharacters = async (page: number) => {
  const response = await axios.get(`${API_BASE_URL}character?page=${page}`);

  return response.data;
};
