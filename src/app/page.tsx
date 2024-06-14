"use client";
import Head from "next/head";
import MoveForm from "./features/request-quote/MoveForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Move Form</title>
      </Head>
      <MoveForm />
    </div>
  );
}
