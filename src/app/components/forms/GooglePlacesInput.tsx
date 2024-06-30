"use client";

import React, { useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface GooglePlacesInputProps {
  label: string;
  name: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | any;
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  label,
  name,
  onPlaceSelected,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

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
          ref={inputRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block w-full border py-[14px] px-[20px] focus:outline-none focus:ring-1 focus:ring-primaryBlue ${
            error ? "border-red-500" : ""
          }`}
        />
      </Autocomplete>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default GooglePlacesInput;
