import { useState, useEffect } from "react";

const useTomorrowDate = () => {
  const [tomorrowDate, setTomorrowDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format the date to YYYY-MM-DD
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setTomorrowDate(formatDate(tomorrow));
  }, []);

  return tomorrowDate;
};

export default useTomorrowDate;
