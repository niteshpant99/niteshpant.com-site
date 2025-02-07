import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "app/components/image-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Work done by Nitesh Pant",
};

export default function Work() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-medium tracking-tight">Work</h1>
      <p>A selection of work I've done</p>
      <h2 className="mb-4 pl-4 pt-4 text-xl">alkemy platform for Roland Berger</h2>
      <p className="mb-2">alkemy is a platform that allows Roland Berger to model any chemical asset in the world based on the technology used and raw material inputs</p>
      <h2 className="mb-2 pl-4 pt-4 text-xl">Hercules Transformation</h2>
      <a 
            href={`/work/hercules`}
            rel="noopener noreferrer"
            className="text-l text-blue-500 hover:text-blue-600 mb-4 pl-4 pt-4"
          >
          View pricing estimations →
          </a>
      
      <p className="mb-2">Created a GTM framework for Hercules, a healthtech SaaS. From an updated brand identity, to ICP, price modeling, to crafting an online presence - did it all.</p>
      <h2 className="mb-4 pl-4 pt-4 text-xl">DevDash Metamorphosis</h2>
      <p className="mb-2">Strategic pivot of DevDash from a general IT consulting company to an AI research and development company</p>
      <h2 className="mb-4 pl-4 pt-4 text-xl">Novodaya</h2>
      <h2 className="mb-4 pl-4 pt-4 text-xl">Luna</h2>
      <h2 className="mb-4 pl-4 pt-4 text-xl">Safka</h2>
      <h2 className="mb-4 pl-4 pt-4 text-xl">Fun React Weekend gigs</h2>
      
      {/*}
      <ImageGrid
        columns={3}
        images={[
          {
            src: "/photos/photo1.jpg",
            alt: "Roman columns",
            href: "https://unsplash.com/photos/people-walking-near-building-during-daytime-dFLBDQQeffU?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
          },
          {
            src: "/photos/photo2.jpg",
            alt: "Big Ben",
            href: "https://unsplash.com/photos/big-ben-london-MdJq0zFUwrw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
          },
          {
            src: "/photos/photo3.jpg",
            alt: "Sacré-Cœur Basilica",
            href: "https://unsplash.com/photos/a-view-of-the-inside-of-a-building-through-a-circular-window-Tp-3hrx88J4",
          },
          {
            src: "/photos/photo4.jpg",
            alt: "Eiffel Tower",
            href: "https://unsplash.com/photos/the-eiffel-tower-towering-over-the-city-of-paris-OgPuPvPsHLM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
          },
          {
            src: "/photos/photo5.jpg",
            alt: "Taj Mahal",
            href: "https://unsplash.com/photos/taj-mahal-india-IPlPkWPJ2fo",
          },
          {
            src: "/photos/photo6.jpg",
            alt: "Colosseum",
            href: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-3cyBR1rIJmA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
          },
        ]}
          
      />
      
      <ImageGrid
        columns={2}
        images={[
          { src: "/photos/photo1.jpg", alt: "Roman columns" },
          { src: "/photos/photo2.jpg", alt: "Big Ben" },
          { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica" },
          { src: "/photos/photo4.jpg", alt: "Eiffel Tower" },
        ]}
      />

      <ImageGrid
        columns={4}
        images={[
          { src: "/photos/photo1.jpg", alt: "Roman columns" },
          { src: "/photos/photo2.jpg", alt: "Big Ben" },
          { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica" },
          { src: "/photos/photo4.jpg", alt: "Eiffel Tower" },
          { src: "/photos/photo5.jpg", alt: "Taj Mahal" },
          { src: "/photos/photo6.jpg", alt: "Colosseum" },
        ]}
      />
      */}

    </section>
  );
}
