import { useState, useEffect } from "react";

// Define a conversion factor from kilometers to miles
const KM_TO_MILES = 0.621371;

const useKilometersToMiles = (kilometers: any) => {
  const [miles, setMiles] = useState<number>(0);
  const km = kilometers / 1000;
  useEffect(() => {
    const convertedMiles = Number(km) * KM_TO_MILES;
    setMiles(convertedMiles);
  }, [kilometers]);

  return miles.toFixed(2);
};

export default useKilometersToMiles;
