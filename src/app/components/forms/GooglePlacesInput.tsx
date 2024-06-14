"use client";

import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface GooglePlacesInputProps {
  label: string;
  name: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  error?: string;
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  label,
  name,
  onPlaceSelected,
  error,
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && onPlaceSelected) {
      onPlaceSelected(place);
    }
  };

  return (
    <div className="flex-1">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          id={name}
          name={name}
          className={`block w-full border p-2 rounded ${
            error ? "border-red-500" : ""
          }`}
        />
      </Autocomplete>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default GooglePlacesInput;
