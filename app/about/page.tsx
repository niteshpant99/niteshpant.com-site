import React from "react";
import { metaData } from "../config";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "About Nitesh",
  };

export default function About() {
  return (
    <div>
      <h1>{metaData.title}</h1>
      <p>{metaData.description}</p>
    </div>
  );
}