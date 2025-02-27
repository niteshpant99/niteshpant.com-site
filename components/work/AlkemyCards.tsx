"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "../ui/apple-cards-carousel";

export function AppleCards() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-4 px-1">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        alkemy: a platform for modeling chemical assets
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

// Client Content
const ClientContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-xl mb-4">
      <p className="text-neutral-700 dark:text-neutral-200 text-base font-semibold mb-2">Roland Berger</p>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        Roland Berger is a leading global management consulting firm with offices in 35 countries. Their chemical industry practice provides strategic advisory to Fortune 500 companies worldwide.
      </p>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        The chemicals practice is known for their industry-leading cost curve analysis, which provides critical competitive intelligence to chemical companies. This analysis requires deep expertise and institutional knowledge that has historically been locked in manual processes.
      </p>
    </div>
  );
};

// Problem Content
const ProblemContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-xl mb-4">
      <p className="text-neutral-700 dark:text-neutral-200 text-base font-semibold mb-2">Current Challenges</p>
      <ul className="text-neutral-600 dark:text-neutral-400 text-sm list-disc pl-4 space-y-2">
        <li>Creating new cost curves takes approximately 2 weeks of manual work</li>
        <li>Over 4,000 consultant hours annually spent on data processing rather than strategic advisory</li>
        <li>Manual data processing costs an estimated $1.6M annually</li>
        <li>Institutional knowledge is fragmented across 50+ global offices</li>
        <li>Static Excel models can't adapt to real-time market shifts</li>
        <li>Competitors are advancing with tech-enabled solutions</li>
      </ul>
    </div>
  );
};

// Solution Content
const SolutionContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-xl mb-4">
      <p className="text-neutral-700 dark:text-neutral-200 text-base font-semibold mb-2">The Alkemy Platform</p>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        Alkemy is an advanced market intelligence platform that transforms chemical asset analysis through real-time data integration and AI-powered insights. The platform modernizes Roland Berger's traditional cost curve creation process by automating data collection, standardizing analysis, and enabling dynamic visualization of global chemical production economics.
      </p>
      <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium">Core Capabilities:</p>
      <ul className="text-neutral-600 dark:text-neutral-400 text-sm list-disc pl-4 mt-1">
        <li>Intelligent cost curve automation</li>
        <li>Unified knowledge hub for institutional expertise</li>
        <li>Live market monitoring with historical insights</li>
      </ul>
    </div>
  );
};

// Implementation Content
const ImplementationContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-xl mb-4">
      <p className="text-neutral-700 dark:text-neutral-200 text-base font-semibold mb-2">Three Intuitive Interfaces</p>
      <div className="space-y-3">
        <div>
          <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium">Atlas</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs">Visual process flow interface with drag-and-drop mapping for rapid chemical asset modeling</p>
        </div>
        <div>
          <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium">Grid</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs">Data management with Excel-like features, validation, and live data</p>
        </div>
        <div>
          <p className="text-neutral-700 dark:text-neutral-200 text-sm font-medium">Lens</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs">Dynamic cost curve visualization with real-time regional analysis</p>
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-3 italic">
        Platform deployed as a secure, enterprise-grade SaaS solution with role-based access controls and version tracking
      </p>
    </div>
  );
};

// Outcome Content
const OutcomeContent = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 rounded-xl mb-4">
      <p className="text-neutral-700 dark:text-neutral-200 text-base font-semibold mb-2">Business Impact</p>
      <ul className="text-neutral-600 dark:text-neutral-400 text-sm list-disc pl-4 space-y-2">
        <li>Reduce cost curve creation from 2 weeks to just minutes</li>
        <li>Save an estimated $1.6M annually in consultant time</li>
        <li>Transform project-specific insights into scalable competitive advantages</li>
        <li>Enable real-time strategic decision making for clients</li>
        <li>Position Roland Berger at the forefront of AI-enabled chemical consulting</li>
      </ul>
      <p className="text-neutral-600 dark:text-neutral-400 text-xs mt-3 font-medium">
        Current status: In development with 90-day pilot focusing on HDPE cost curves in North America
      </p>
    </div>
  );
};

// The carousel cards and data
const data = [
  {
    category: "Client",
    title: "Roland Berger Chemicals Practice",
    src: "",
    content: <ClientContent />,
  },
  {
    category: "Problem",
    title: "Manual cost curve analysis taking weeks",
    src: "",
    content: <ProblemContent />,
  },
  {
    category: "Solution",
    title: "Real-time chemical asset intelligence",
    src: "",
    content: <SolutionContent />,
  },
  {
    category: "Implementation",
    title: "Atlas, Grid & Lens interfaces",
    src: "",
    content: <ImplementationContent />,
  },
  {
    category: "Outcome",
    title: "From weeks to minutes, saving $1.6M annually",
    src: "",
    content: <OutcomeContent />,
  }
];