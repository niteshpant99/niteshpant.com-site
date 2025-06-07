import React from "react";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Work",
  description: "Work done by Nitesh Pant",
};

export default function Work() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-medium tracking-tight">Work</h1>
      <p>A selection of work I've done</p>
      {/* <h2 className="mb-4 pt-4 text-xl">alkemy platform for Roland Berger</h2>
      <p className="mb-2">alkemy is a platform that allows Roland Berger to model any chemical asset in the world based on the technology used and raw material inputs</p> */}
      <h2 className="mb-2 pt-4 text-xl">Hercules Transformation</h2>
      <a 
            href={`/work/hercules`}
            rel="noopener noreferrer"
            className="text-l text-blue-500 hover:text-blue-600 mb-4 pl-1 pt-1"
          >
          View pricing estimations →
          </a>
      
      <p className="mb-2">Created a GTM framework for Hercules, a healthtech SaaS. From an updated brand identity, to ICP, price modeling, to crafting an online presence - did it all.</p>
      <h2 className="mb-4 pt-4 text-xl">DevDash Metamorphosis</h2>
      <p className="mb-2">Strategic pivot of DevDash from a general IT consulting company to an AI research and development company</p>
      <h2 className="mb-4 pt-4 text-xl">Novodaya</h2>
      <h2 className="mb-4 pt-4 text-xl">Luna</h2>
      <h2 className="mb-4 pt-4 text-xl">Safka</h2>
      <h2 className="mb-4 pt-4 text-xl">Fun React Weekend gigs</h2>

    </section>
  );
}
