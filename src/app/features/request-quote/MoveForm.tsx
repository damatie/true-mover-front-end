"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import TextInput from "../../components/forms/TextInput";
import RadioInput from "../../components/forms/RadioInput";
import GooglePlacesInput from "../../components/forms/GooglePlacesInput";
import StepIndicator from "./components/StepIndicator";

const steps = ["Move Info", "Inventories", "Location", "Done"];

const validationSchema = Yup.object().shape({
  source: Yup.string().required("Source is required"),
  destination: Yup.string().required("Destination is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  date: Yup.string().required("Date is required"),
  period: Yup.string().required("Period is required"),
  userType: Yup.string().required("User type is required"),
});

const MoveForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [source, setSource] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [destination, setDestination] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const calculateDistance = (
    source: google.maps.LatLng,
    destination: google.maps.LatLng
  ) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [source],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (
          status === "OK" &&
          response &&
          response.rows[0].elements[0].status === "OK"
        ) {
          setDistance(response.rows[0].elements[0].distance.text);
        }
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      source: "",
      destination: "",
      name: "",
      email: "",
      phone: "",
      date: "",
      period: "Morning",
      userType: "new",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    },
  });

  const handleSourceSelected = (place: google.maps.places.PlaceResult) => {
    setSource(place);
    formik.setFieldValue("source", place.formatted_address);
    if (place && destination) {
      calculateDistance(
        place.geometry!.location!,
        destination.geometry!.location!
      );
      getDirections(place.geometry!.location!, destination.geometry!.location!);
    }
  };

  const handleDestinationSelected = (place: google.maps.places.PlaceResult) => {
    setDestination(place);
    formik.setFieldValue("destination", place.formatted_address);
    if (place && source) {
      calculateDistance(source.geometry!.location!, place.geometry!.location!);
      getDirections(source.geometry!.location!, place.geometry!.location!);
    }
  };

  const getDirections = (
    source: google.maps.LatLng,
    destination: google.maps.LatLng
  ) => {
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDHvG4aYg9OBDyVWvTaKUsUg-uDqLXoh_c"
      libraries={["places"]}
    >
      <StepIndicator currentStep={currentStep} />
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {currentStep === 0 && (
          <>
            <div className="flex space-x-4">
              <GooglePlacesInput
                label="Source"
                name="source"
                onPlaceSelected={handleSourceSelected}
                error={formik.errors.source}
              />
              <GooglePlacesInput
                label="Destination"
                name="destination"
                onPlaceSelected={handleDestinationSelected}
                error={formik.errors.destination}
              />
            </div>

            <div className="h-64">
              <GoogleMap
                center={{ lat: 54.0, lng: -2.0 }} // Centered on the UK
                zoom={6}
                mapContainerStyle={{ height: "100%", width: "100%" }}
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

            {distance && <div>Distance: {distance}</div>}

            <div>
              <div className="flex space-x-4">
                <RadioInput
                  label="Existing user"
                  name="userType"
                  value="existing"
                  checked={formik.values.userType === "existing"}
                  onChange={formik.handleChange}
                />
                <RadioInput
                  label="New user"
                  name="userType"
                  value="new"
                  checked={formik.values.userType === "new"}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="flex space-x-4">
                <TextInput
                  label="Name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name}
                />
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
                />
              </div>

              <div className="flex space-x-4">
                <TextInput
                  label="Phone"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.errors.phone}
                />
              </div>

              <div className="flex space-x-4">
                <TextInput
                  label="Date"
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                  error={formik.errors.date}
                />
                <div className="flex-1">
                  <label htmlFor="period" className="block mb-2">
                    Period
                  </label>
                  <select
                    id="period"
                    name="period"
                    onChange={formik.handleChange}
                    value={formik.values.period}
                    className="block w-full border p-2 rounded"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                  {formik.touched.period && formik.errors.period ? (
                    <div className="text-red-500">{formik.errors.period}</div>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 1 && <div>{/* Your Inventories form fields */}</div>}

        {currentStep === 2 && <div>{/* Your Location form fields */}</div>}

        {currentStep === 3 && <div>{/* Your Done form fields */}</div>}

        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Next
        </button>
      </form>
    </LoadScript>
  );
};

export default MoveForm;
