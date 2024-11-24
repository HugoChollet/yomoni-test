import axios from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api/";

export const fetchEpisodes = async () => {
  const response = await axios.get(`${API_BASE_URL}episode/`);

  return response.data.results;
};

export const fetchCharacters = async () => {
  const response = await axios.get(`${API_BASE_URL}character/`);
  console.log(response);

  return response.data.results;
};
