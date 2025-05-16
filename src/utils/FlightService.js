import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const URI = process.env.NEXT_PUBLIC_FLIGHTS_URI;

export const fetchFlights = async (searchParams, isReturnPage = false) => {
  try {
    const commonParams = {
      cabinClass: searchParams.flightClass,
      adults: searchParams.adults,
      childrens: searchParams.childrens,
      infants: searchParams.infants,
      sortBy: "best",
      currency: "USD",
      limit: 10,
    };

    let response;

    if (isReturnPage) {
      const { fromSkyID, toSkyID, fromSkyEntity, toSkyEntity, returnDate } =
        searchParams;
      response = await axios.get(URI, {
        params: {
          ...commonParams,
          originSkyId: toSkyID,
          destinationSkyId: fromSkyID,
          originEntityId: toSkyEntity,
          destinationEntityId: fromSkyEntity,
          date: returnDate,
        },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      });
    } else {
      const {
        fromSkyID,
        toSkyID,
        fromSkyEntity,
        toSkyEntity,
        departureDate,
        returnDate,
      } = searchParams;

      response = await axios.get(URI, {
        params: {
          ...commonParams,
          originSkyId: fromSkyID,
          destinationSkyId: toSkyID,
          originEntityId: fromSkyEntity,
          destinationEntityId: toSkyEntity,
          date: departureDate,
          returnDate: returnDate,
        },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      });
    }
    const itineraries = response?.data?.data?.itineraries;

    if (!Array.isArray(itineraries) || itineraries.length === 0) {
      console.warn("No itineraries found.");
      return [];
    }

    return itineraries;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    throw error;
  }
};
