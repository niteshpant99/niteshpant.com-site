import React from "react";
import { metaData } from "../config";
import { Metadata } from "next";
import { Meteors } from "../../components/ui/meteors";


export const metadata: Metadata = {
    title: "About",
    description: "About Nitesh",
  };

export default function About() {
  return (
    
    <div>
      <div className="relative flex h-[100px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background ">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        <h1>About</h1>
      </span>
    </div>

    <div>
      <p className="mb-4 mt-2">
        I am an economist by training, consultant by trade, and a technology enthusiast at heart. Born and raised in Nepal, I came to the United States in 2018 to study at Dartmouth College, where I majored in Economics. My journey from the remote Far-Western region of Nepal to the Ivy League shaped my perspective on the transformative power of opportunity and education. After graduating in 2023, I worked as a management consultant at Roland Berger, focusing on healthcare and chemical industry projects.
        </p>
        <p className="mb-4">
        Currently, I lead Product, Strategy and Growth at DevDash Labs. I spearhead our pivot to becoming an AI solutions provider, developing products that enhance operational efficiency for clients across multiple states. In the process, I learned to code and sell.
        </p>
        <p className="mb-4">
        My experiences span from managing oxygen supply during COVID-19 in Nepal to evaluating multi-billion dollar M&A deals in Boston. These diverse challenges have taught me adaptability and resilience. Beyond work, I’m a part-time DJ, philosophy enthusiast, and rock climber. I believe in thinking long-term, valuing knowledge over money, and daring to be different. My mission is to leverage technology and economics to drive sustainable development, particularly in emerging markets.
      </p>
    </div>

    <div className="relative flex w-full flex-col items-center justify-center text-left">
      <p className="font-semibold mt-2 mb-2 text-lg">My Values</p> 
      <ol className="list-decimal pl-5"> 
        <li className="font-medium">Knowledge over money</li> 
        <li className="font-medium">Impact over profits</li>
        <li className="font-medium">Think long-term</li>
        <li className="font-medium">Dare to be different</li>
      </ol>
    </div>  
  </div>

  );
}