const API_KEY = process.env.NEXT_PUBLIC_API_KEY_CITY;

export const fetchCities = async (query) => {
  if (!query) return [];

  const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    return data.map((city) => `${city.name}, ${city.country}`);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
