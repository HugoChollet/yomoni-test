import axios from "axios";

const API_BASE_URL = "https://swapi.dev/api/";

export const fetchFilms = async () => {
  const response = await axios.get(`${API_BASE_URL}films/`);

  return response.data.results;
};

export const fetchCharacters = async () => {
  const response = await axios.get(`${API_BASE_URL}people/`);
  console.log(response);

  return response.data.results;
};
