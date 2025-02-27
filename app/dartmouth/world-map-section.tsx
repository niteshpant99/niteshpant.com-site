// app/components/dartmouth/world-map-section.tsx
"use client";

import WorldMap from "../../components/ui/world-map";
import { motion } from "motion/react";
import React from "react";


export default function WorldMapSection() {
  return (
    <div className=" py-2 dark:bg-[--background] w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[--prose-text] font-bold text-xl md:text-4xl">
          Dhangadhi →{" "}
          <span className="text-[--prose-dartmouth]">
            {"Dartmouth".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.02, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
        From a small town in Farwest Nepal to Dartmouth College. 
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: { lat: 26.6667, lng: 84.36, label: "Dhangadhi" }, // Dhangadhi, Nepal
            end: { lat: 47.1023, lng: -71.2901, label: "Hanover" }, // Hanover, NH, USA
          },
        ]}
      />
    </div>
  );
}