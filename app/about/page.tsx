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
      <h1 className="text-xl mb-8">About Nitesh</h1>

      <p className="mb-4">
        I am an economist by training, consultant by trade, and a technology enthusiast at heart. Born and raised in Nepal, I came to the United States in 2018 to study at Dartmouth College, where I majored in Economics. My journey from the remote Far-Western region of Nepal to the Ivy League shaped my perspective on the transformative power of opportunity and education. After graduating in 2023, I worked as a management consultant at Roland Berger, focusing on healthcare and chemical industry projects.
        </p>
        <p className="mb-4">
        Currently, I lead strategy and growth at a pre-seed AI startup, where I blend analytical consulting skills with technical expertise in SQL, Python, and data visualization. I spearhead our pivot to becoming an AI solutions provider, developing products that enhance operational efficiency for clients across multiple states. This combination of strategic thinking and technical execution enables me to bridge business objectives with technological solutions.
        </p>
        <p className="mb-4">
        My experiences span from managing oxygen supply during COVID-19 in Nepal to evaluating multi-billion dollar M&A deals in Boston. These diverse challenges have taught me adaptability and resilience. Beyond work, I’m a part-time DJ, philosophy enthusiast, and rock climber. I believe in thinking long-term, valuing knowledge over money, and daring to be different. My mission is to leverage technology and economics to drive sustainable development, particularly in emerging markets.
      </p>
    </div>
  );
}