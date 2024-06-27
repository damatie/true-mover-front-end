"use client";

import React from "react";

interface RequestQuoteLayoutProps {
  children: React.ReactNode;
}

const RequestQuoteLayout: React.FC<RequestQuoteLayoutProps> = ({
  children,
}) => {
  return (
    <div className=" flex flex-col w-full mx-auto px-[20px] ">
      <div className=" flex w-full mb-[40px] md:mb-[60px] ">
        <img src="/img/logo-plain.png" className=" w-[150px] md:w-[200px]" />
      </div>
      <div className=" text-center mb-[50px]">
        <p className=" text-primaryBlue text-sm font-semibold">
          REQUEST A QUOTE
        </p>
        <p className=" text-[20px] md:text-[32px]">
          Getting Movers and Packers Quotes is Easy
        </p>
      </div>
      <div className=" flex w-full max-w-[1000px] mx-auto">{children}</div>
    </div>
  );
};

export default RequestQuoteLayout;
