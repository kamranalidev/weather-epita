import axios from "axios";

const URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = "2bf86e7e43084a9aa90171041262101";

export const fetchWeather = async (cityName) => {
  const { data } = await axios.get(URL, {
    params: {
      q: cityName,
      key: API_KEY,
    },
  });
  return data;
};
