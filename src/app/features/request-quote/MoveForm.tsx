"use client";

import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { LoadScript } from "@react-google-maps/api";
import emailjs from "emailjs-com";
import StepIndicator from "./components/StepIndicator";
import RequestQuoteLayout from "@/app/components/layouts/requestQuoteLayout";
import Button from "@/app/components/forms/Button";
import MoveInfo from "./MoveInfoStep";
import InventoriesStep from "./InventoriesStep";
import LocationStep from "./LocationStep";
import RightSideSummary from "@/app/features/request-quote/components/RightSideSummary";
import ThankYouStep from "./ThankYouStep";

import {
  InventoryData,
  InventoryItemType,
  LocationData,
} from "../request-quote/utils/types"; // Import the types
import {
  FLoorCost,
  Inventory,
  LandingCost,
  ManpowerCost,
  MillagePrice,
  PackagingPrice,
  UnpackagingPrice,
  UrgentPickupPrice,
} from "./utils/data";
import LoadingScreen from "@/app/components/shared/LoadingScreen";

const steps = ["Move Info", "Inventories", "Location", "Done"];

const getValidationSchema = (currentStep: number) => {
  switch (currentStep) {
    case 0:
      return Yup.object().shape({
        source: Yup.string().required("Location is required"),
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
    case 1:
      return Yup.object().shape({});
    case 2:
      return Yup.object().shape({
        loadingStreet: Yup.string().required("Loading street is required"),
        unloadingStreet: Yup.string().required("Unloading street is required"),
      });
    default:
      return Yup.object().shape({});
  }
};

const MoveForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(Number(0));
  const [sourceValid, setSourceValid] = useState(false);
  const [destinationValid, setDestinationValid] = useState(false);
  const [source, setSource] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [distance, setDistance] = useState<string | number | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [inventoryData, setInventoryData] = useState<InventoryData>(Inventory);

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
          setDistance(response.rows[0].elements[0].distance.value);
        }
      }
    );
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

  const handleNext = (validateForm: any, values: any) => {
    validateForm().then((errors: any) => {
      if (Object.keys(errors).length === 0 && sourceValid && destinationValid) {
        if (currentStep === 1) {
          const hasSelectedItems = Object.values(inventoryData).some(
            (category) => category.some((item) => item.qty > 0)
          );
          if (!hasSelectedItems) {
            alert("Please select at least one item.");
            return;
          }
        } else if (currentStep === 2 && values.additionalPackingMaterial) {
          const hasSelectedMaterials = values.extraMaterials.some(
            (material: any) => material.quantity > 0
          );
          if (!hasSelectedMaterials) {
            alert("Please select at least one packing material.");
            return;
          }
        }
        setCurrentStep(currentStep + 1);
      }
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInventoryChange = (
    category: string,
    name: string,
    qty: number
  ) => {
    setInventoryData((prevInventoryData) => ({
      ...prevInventoryData,
      [category]: prevInventoryData[category].map((item) =>
        item.name === name ? { ...item, qty } : item
      ),
    }));
  };

  const initialValues: LocationData = {
    source: "",
    destination: "",
    name: "",
    email: "",
    phone: "",
    date: "",
    period: "Morning",
    userType: "new",
    loadingFloor: 0,
    loadingStreet: "",
    loadingElevator: false,
    loadingPackaging: false,
    unloadingFloor: 0,
    unloadingStreet: "",
    unloadingElevator: false,
    unloadingUnpacking: false,
    manpower: 1,
    additionalPackingMaterial: false,
    extraMaterials: [
      { name: "Small Box", quantity: 0, price: 10 },
      { name: "Medium Box", quantity: 0, price: 15 },
      { name: "Large Box", quantity: 0, price: 20 },
    ], // Initial field for extra materials
  };

  const filterSelectedItems = (data: InventoryData) => {
    const filteredData: InventoryItemType[] = [];
    for (const category in data) {
      const filteredItems = data[category].filter((item) => item.qty > 0);
      if (filteredItems.length > 0) {
        filteredData.push(...filteredItems);
      }
    }
    return filteredData;
  };

  const sendEmail = (formData: any) => {
    const serviceID: string = process.env
      .NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateID: string = process.env
      .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    emailjs.send(serviceID, templateID, formData, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      },
      (err) => {
        console.error("FAILED...", err);
      }
    );
  };
  // Calculate total volume and sum price

  const calculateTotalVolume = () => {
    return filterSelectedItems(inventoryData).reduce(
      (total, item) => total + item.volume * item.qty,
      0
    );
  };

  const calculateSumPrice = () => {
    return filterSelectedItems(inventoryData).reduce(
      (total, item) => total + item.amount * item.qty,
      0
    );
  };

  // Calculate total price
  const calculateTotalPrice = (values: LocationData) => {
    const sumPrice = calculateSumPrice();
    const HighFloorCost =
      (values.loadingFloor && Number(values.loadingFloor) > 1) ||
      (values.unloadingFloor && Number(values.unloadingFloor) > 1)
        ? FLoorCost
        : 0;
    const UrgentPickupCost =
      new Date(values.date) <=
      new Date(new Date().setDate(new Date().getDate() + 2))
        ? UrgentPickupPrice
        : 0;
    const MillageCost = ((distance as number) / 1609.34) * MillagePrice;
    const ExtraMaterialsCost = values.extraMaterials.reduce(
      (total, material) => total + material.price * material.quantity,
      0
    );
    const ManPower =
      Number(values.manpower) > 1
        ? Number(values.manpower) * Number(ManpowerCost) - Number(ManpowerCost)
        : 0;
    const PackagingCost = values.loadingPackaging ? PackagingPrice : 0;
    const UnpackagingCost = values.unloadingUnpacking ? UnpackagingPrice : 0;

    return (
      sumPrice +
      ExtraMaterialsCost +
      HighFloorCost +
      LandingCost +
      UrgentPickupCost +
      ManPower +
      PackagingCost +
      UnpackagingCost +
      MillageCost
    );
  };
  const handleSubmit = (
    values: LocationData,
    { resetForm }: { resetForm: any }
  ) => {
    setIsLoading(true);
    const filteredInventoryData = filterSelectedItems(inventoryData);

    const formData = {
      reference: Math.floor(10000000 + Math.random() * 90000000).toString(),

      total_price: calculateTotalPrice(values).toFixed(2),
      volume: calculateTotalVolume(),
      ...values,
      distance: ((distance as number) / 1609.34).toFixed(2), // Convert to miles
      loadingElevator: values.loadingElevator ? "Yes" : "No",
      loadingPackaging: values.loadingPackaging ? "Yes" : "No",
      unloadingElevator: values.unloadingElevator ? "Yes" : "No",
      unloadingUnpacking: values.unloadingUnpacking ? "Yes" : "No",

      inventory: filteredInventoryData,
      extra_materials: values.extraMaterials.filter(
        (material) => material.quantity > 0
      ),
    };

    sendEmail(formData);
  };

  return (
    <RequestQuoteLayout step={currentStep}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ""}
        libraries={["places"]}
        loadingElement={<LoadingScreen />} // Use the custom loading screen
      >
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(currentStep)}
          onSubmit={handleSubmit}
        >
          {({
            validateForm,
            isValid,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <main className="flex flex-col lg:flex-row w-full">
              <div
                className={` w-full  ${
                  Number(currentStep) === 0 || Number(currentStep) === 3
                    ? " mx-auto w-full"
                    : "lg:w-3/4"
                }`}
              >
                {Number(currentStep) !== 3 && (
                  <StepIndicator currentStep={currentStep} />
                )}
                <Form className="space-y-6 md:px-[40px] xl:mt-[70px]">
                  {currentStep === 0 && (
                    <MoveInfo
                      sourceValid={sourceValid}
                      destinationValid={destinationValid}
                      setSourceValid={setSourceValid}
                      setDestinationValid={setDestinationValid}
                      setSource={setSource}
                      setDestination={setDestination}
                      source={source}
                      destination={destination}
                      distance={distance}
                      directions={directions}
                      calculateDistance={calculateDistance}
                      getDirections={getDirections}
                    />
                  )}

                  {currentStep === 1 && (
                    <InventoriesStep
                      inventoryData={inventoryData}
                      handleInventoryChange={handleInventoryChange}
                    />
                  )}

                  {currentStep === 2 && (
                    <LocationStep
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  )}

                  {currentStep === 3 && <ThankYouStep />}

                  {currentStep < 3 && (
                    <div className="flex justify-between items-start !my-[40px]">
                      <Button
                        type="button"
                        onClick={handleBack}
                        className="bg-gray-500 text-white md:py-[15px] md:w-[200px]"
                        disabled={currentStep === 0}
                      >
                        Back
                      </Button>
                      {Number(currentStep) !== 2 && (
                        <Button
                          type="button"
                          onClick={() => handleNext(validateForm, values)}
                          className={`${
                            (currentStep === 0 &&
                              (!sourceValid || !destinationValid)) ||
                            !isValid
                              ? "bg-gray-500"
                              : "bg-primaryBlue"
                          } text-white md:py-[15px] md:w-[200px]`}
                          disabled={
                            (currentStep === 0 &&
                              (!sourceValid || !destinationValid)) ||
                            !isValid
                          }
                        >
                          Next
                        </Button>
                      )}
                      {Number(currentStep) === 2 && (
                        <Button
                          type="submit"
                          className={`${
                            (currentStep === 0 &&
                              (!sourceValid || !destinationValid)) ||
                            !isValid
                              ? "bg-gray-500"
                              : "bg-primaryBlue"
                          } text-white md:py-[15px] md:w-[200px]`}
                          disabled={
                            (currentStep === 0 &&
                              (!sourceValid || !destinationValid)) ||
                            !isValid ||
                            isLoading
                          }
                        >
                          {isLoading ? "Pleas wait.." : "Submit"}
                        </Button>
                      )}
                    </div>
                  )}
                </Form>
              </div>
              {currentStep > 0 && currentStep < 3 && (
                <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
                  <RightSideSummary
                    distance={distance}
                    timePeriod={values.period}
                    pickupDate={values.date}
                    source={values.source}
                    destination={values.destination}
                    selectedItems={filterSelectedItems(inventoryData)}
                    locationData={values}
                  />
                </div>
              )}
            </main>
          )}
        </Formik>
      </LoadScript>
    </RequestQuoteLayout>
  );
};

export default MoveForm;
