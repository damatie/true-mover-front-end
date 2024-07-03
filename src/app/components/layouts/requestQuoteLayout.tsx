"use client";

import React from "react";

interface RequestQuoteLayoutProps {
  children: React.ReactNode;
  step: number;
}

const RequestQuoteLayout: React.FC<RequestQuoteLayoutProps> = ({
  children,
  step,
}) => {
  return (
    <div className=" flex flex-col w-full mx-auto px-[20px] ">
      <div className=" flex w-full mb-[40px] md:mb-[60px]  max-w-[1200px] mx-auto ">
        <a href="https://caesarland.co.uk">
          <img src="/img/logo-plain.png" className=" w-[150px] md:w-[200px]" />
        </a>
      </div>
      {Number(step) !== 3 && (
        <div className=" text-center mb-[70px]">
          <p className=" text-primaryBlue text-sm font-semibold">
            REQUEST A QUOTE
          </p>
          <p className=" text-[20px] md:text-[32px] mx-auto">
            Getting Movers and Packers Quotes is Easy
          </p>
        </div>
      )}
      <div className=" flex w-full max-w-[1000px] mx-auto">{children}</div>
      <div className=" text-center text-primaryBlue  font-medium">
        <a href="https://caesarland.co.uk">Go back to website</a>
      </div>
    </div>
  );
};

export default RequestQuoteLayout;
