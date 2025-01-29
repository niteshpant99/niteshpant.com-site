// app/components/dartmouth/world-map-section.tsx
"use client";

import WorldMap from "../components/ui/world-map";
import { motion } from "motion/react";
import React from "react";

export default function WorldMapSection() {
  return (
    <div className=" py-2 dark:bg-black w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Dhangadhi →{" "}
          <span className="text-neutral-400">
            {"Dartmouth".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
        From a small town in Nepal to Dartmouth College. 
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: { lat: 28.6667, lng: 80.36, label: "Dhangadhi" }, // Dhangadhi, Nepal
            end: { lat: 43.7023, lng: -72.2901, label: "Hanover" }, // Hanover, NH, USA
          },
        ]}
      />
    </div>
  );
}