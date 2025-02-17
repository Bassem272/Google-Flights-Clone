import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const fetchSkyID = async (city, setSkyID, setSkyEntity) => {
  try {
    const response = await axios.get(
      "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
      {
        params: { query: city, locale: "en-US" },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }
    );

    const data = response.data;
    if (data && data.data.length > 0) {
      setSkyEntity(data.data[0].entityId);
      setSkyID(data.data[0].skyId);
    } else {
      setSkyID(null);
    }
  } catch (error) {
    console.error(`Error fetching SkyID for ${city}:`, error);
    setSkyID(null);
  }
};
