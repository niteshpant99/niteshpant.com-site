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

    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <p className="mb-4 mt-2">
        I am an economist by training, a consultant by trade, and a technology enthusiast at heart. Born and raised in Nepal, I came to the United States <a href="/dartmouth">in 2018 to study at Dartmouth College</a>, where I majored in Economics. My journey from the remote Far-Western region of Nepal to the Ivy League shaped my perspective on the transformative power of opportunity and education.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">From Nepal to the Global Stage</h2>
      <p className="mb-4">
        After graduating from Dartmouth in 2023, I worked <a href="/work">as a management consultant at Roland Berger</a>, focusing on healthcare and chemical industry projects. In the past, I've also interned at a hedge fund.
      </p>
      <p className="mb-4">
        My experiences span from managing oxygen supply during the COVID-19 health crisis in Nepal to evaluating multi-billion-dollar M&A deals in Boston, teaching me adaptability and systems thinking across vastly different contexts.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Building with AI</h2>
      <p className="mb-4">
        I'm the co-founder of <a target="_blank" href="https://devdashlabs.com">DevDash Labs</a>. I lead Product, Design, Strategy, and Growth at DevDash Labs. I spearheaded our transformation into an AI solutions provider. I've learned to code, sell, and build products that enhance operational efficiency for clients across multiple industries.
      </p>
      <p className="mb-4">
        My approach combines traditional operational wisdom with cutting-edge AI capabilities. Having managed complex, interconnected services, I understand the nuances of implementing technology in environments where failure affects real people's lives.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Beyond Work</h2>
      <p className="mb-4">
        I'm a part-time <a target="_blank" href="https://www.instagram.com/pantakanxa/">DJ</a>, philosophy enthusiast, and rock climber. I believe in thinking long-term, valuing knowledge over money, and daring to be different. My mission is to leverage technology and economics to drive sustainable development, particularly in emerging markets.
      </p>
    </div>

    <div className="relative flex w-full flex-col items-center justify-center text-left">
      <p className="font-semibold mt-8 mb-2 text-lg">My Values</p> 
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
