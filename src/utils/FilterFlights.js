export const filterFlights = (flights, filters) => {
  return flights.filter((flight) => {
    const flightPrice = flight.price?.raw || 0;
    if (flightPrice < filters.minPrice || flightPrice > filters.maxPrice) {
      console.log("Excluded due to price:", flight);
      return false;
    }

    if (filters.stops !== null) {
      const hasMatchingStops =
        flight.legs?.every((leg) => leg.stopCount === filters.stops) || false;
      if (!hasMatchingStops) {
        console.log("Excluded due to stops:", flight);
        return false;
      }
    }

    if (filters.departureTime) {
      const firstLeg = flight.legs?.[0];
      if (firstLeg) {
        const departureHour = parseInt(
          firstLeg.departure.split("T")[1].split(":")[0],
          10
        );

        console.log(
          "First Leg Departure Time:",
          firstLeg.departure,
          "Extracted Departure Hour:",
          departureHour,
          "Applied Filter:",
          filters.departureTime
        );

        switch (filters.departureTime) {
          case "morning":
            if (!(departureHour >= 6 && departureHour < 12)) {
              return false;
            }
            break;
          case "afternoon":
            if (!(departureHour >= 12 && departureHour <= 18)) {
              return false;
            }
            break;
          case "evening":
            if (!(departureHour > 18 && departureHour < 24)) {
              return false;
            }
            break;
          case "night":
            if (!(departureHour >= 0 && departureHour < 6)) {
              return false;
            }
            break;
          default:
            console.log("Invalid departure time filter, ignoring.");
        }
      }
    }

    return true;
  });
};
