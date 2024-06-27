"use client";

import React from "react";
import { useFormikContext } from "formik";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import TextInput from "../../components/forms/TextInput";
import GooglePlacesInput from "../../components/forms/GooglePlacesInput";
import useKilometersToMiles from "@/app/hooks/useKilometersToMiles";
import useTomorrowDate from "@/app/hooks/useTomorrowDate";

interface MoveInfoProps {
  sourceValid: boolean;
  destinationValid: boolean;
  setSourceValid: React.Dispatch<React.SetStateAction<boolean>>;
  setDestinationValid: React.Dispatch<React.SetStateAction<boolean>>;
  setSource: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | null>
  >;
  setDestination: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | null>
  >;
  source: google.maps.places.PlaceResult | null;
  destination: google.maps.places.PlaceResult | null;
  distance: string | number | null;
  directions: google.maps.DirectionsResult | null;
  calculateDistance: (
    source: google.maps.LatLng,
    destination: google.maps.LatLng
  ) => void;
  getDirections: (
    source: google.maps.LatLng,
    destination: google.maps.LatLng
  ) => void;
}

const MoveInfo: React.FC<MoveInfoProps> = ({
  sourceValid,
  destinationValid,
  setSourceValid,
  setDestinationValid,
  setSource,
  setDestination,
  source,
  destination,
  distance,
  directions,
  calculateDistance,
  getDirections,
}) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } =
    useFormikContext<any>();

  const handleSourceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry) {
      setSource(place);
      setFieldValue("source", place.formatted_address);
      setSourceValid(true);
      if (destination) {
        calculateDistance(
          place.geometry.location!,
          destination.geometry!.location!
        );
        getDirections(
          place.geometry.location!,
          destination.geometry!.location!
        );
      }
    } else {
      setSourceValid(false);
      setFieldValue("source", "");
    }
  };

  const handleDestinationSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry) {
      setDestination(place);
      setFieldValue("destination", place.formatted_address);
      setDestinationValid(true);
      if (source) {
        calculateDistance(source.geometry!.location!, place.geometry.location!);
        getDirections(source.geometry!.location!, place.geometry!.location!);
      }
    } else {
      setDestinationValid(false);
      setFieldValue("destination", "");
    }
  };
  // Convert didtance to miles
  const miles = useKilometersToMiles(distance);

  // Disable past and current date
  const minDate = useTomorrowDate();

  return (
    <>
      <div className="flex flex-col xl:flex-row w-full gap-x-[30px] mt-[20px] items-start">
        <div className="flex flex-col flex-1 w-full space-y-[15px]">
          <GooglePlacesInput
            label="Pickup Location"
            name="source"
            onPlaceSelected={handleSourceSelected}
            error={
              (touched.source ?? false) && typeof errors.source === "string"
                ? errors.source
                : !sourceValid && touched.source
                ? "Invalid location"
                : ""
            }
            value={values.source}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <GooglePlacesInput
            label="Destination"
            name="destination"
            onPlaceSelected={handleDestinationSelected}
            error={
              (touched.destination ?? false) &&
              typeof errors.destination === "string"
                ? errors.destination
                : !destinationValid && touched.destination
                ? "Invalid location"
                : ""
            }
            value={values.destination}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {distance && (
            <div className="text-sm">
              <span className="font-semibold">Distance Covered:</span> {miles}{" "}
              mil(s)
            </div>
          )}

          <div className="flex flex-col w-full space-y-[15px]">
            <div className="flex space-x-4">
              <TextInput
                label="Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={(touched.name ?? false) && errors.name}
              />
            </div>
            <div className="flex space-x-4">
              <TextInput
                label="Email"
                name="email"
                type="email"
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={handleBlur}
                value={values.email}
                error={(touched.email ?? false) && errors.email}
              />
            </div>

            <div className="flex space-x-4">
              <TextInput
                label="UK Phone Number"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={(touched.phone ?? false) && errors.phone}
              />
            </div>

            <div className="flex space-x-4">
              <TextInput
                label="Date"
                name="date"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
                error={(touched.date ?? false) && errors.date}
                minDate={minDate}
                hasMinDate={true}
              />
              <div className="flex-1">
                <label htmlFor="period" className="block mb-2">
                  Period
                </label>
                <select
                  id="period"
                  name="period"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.period}
                  className="block w-full border py-[16px] px/[10px] focus:outline-none focus:ring-1 focus:ring-primaryBlue"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
                {touched.period && typeof errors.period === "string" ? (
                  <div className="text-red-500">{errors.period}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full xl:w-[380px] mt-[30px] xl:mt-[30px] h-64">
          <GoogleMap
            center={{ lat: 54.0, lng: -2.0 }} // Centered on the UK
            zoom={6}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            options={{
              mapTypeControl: false, // Disable map type control (map/satellite)
              streetViewControl: false, // Disable Street View control
              fullscreenControl: false, // Disable fullscreen control
            }}
          >
            {source && (
              <Marker
                position={{
                  lat: source.geometry!.location!.lat(),
                  lng: source.geometry!.location!.lng(),
                }}
                icon={{
                  url: "https://img.icons8.com/ios-filled/50/000000/moving-truck.png", // Custom icon for the van
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {destination && (
              <Marker
                position={{
                  lat: destination.geometry!.location!.lat(),
                  lng: destination.geometry!.location!.lng(),
                }}
              />
            )}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default MoveInfo;
