import Image from "next/image";
import { socialLinks, metaData } from "./config";
import React from "react";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nitesh Pant",
  url: metaData.baseUrl,
  image: `${metaData.baseUrl}profile.jpg`,
  jobTitle: "Co-founder",
  worksFor: {
    "@type": "Organization",
    name: "DevDash Labs",
    url: "https://devdashlabs.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dartmouth College",
    url: "https://www.dartmouth.edu",
  },
  sameAs: [
    socialLinks.twitter,
    socialLinks.github,
    socialLinks.linkedin,
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Implementation",
    "Political Economy",
    "Management Consulting",
    "Product Development",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevDash Labs",
  url: "https://devdashlabs.com",
  logo: "https://devdashlabs.com/logo.png",
  description: "Applied AI research and development company building products to solve the hardest problems.",
  founder: {
    "@type": "Person",
    name: "Nitesh Pant",
  },
  foundingDate: "2024",
  areaServed: "Worldwide",
  knowsAbout: ["AI Solutions", "Research Automation", "Enterprise AI"],
};

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
        <Image
          src="/profile.jpg"
          alt="Nitesh Pant - Co-founder of DevDash Labs, AI Implementation Leader"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          width={160}
          height={160}
          priority
        />
      </a>

      <h1 className="mb-6 text-2xl tracking-tight">
        Hello world!<br />
        <span className="font-bold">I'm Nitesh Pant.</span>
      </h1>
      <h2 className="text-[#00693e] dark:text-[#a5d75f] font-bold">I seek impact.</h2>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm the co-founder of <a target="_blank" rel="noopener noreferrer" href="https://devdashlabs.com">DevDash Labs</a>, an applied AI research and development company. We build products to solve the hardest problems for our customers. Our mission is to ignite the AI revolution within organizations. DevDash Labs exists to do great work. This is powered by world-class Nepali talent with global ambitions.
        </p>
        <p>
          I grew up in Nepal, went to <a target="_blank" rel="noopener noreferrer" href="https://www.dartmouth.edu">Dartmouth College</a> (studied economics and government), and worked as a management consultant at <a target="_blank" rel="noopener noreferrer" href="https://www.rolandberger.com">Roland Berger</a>. 
        </p>
        <p>
          At DevDash, we are building out products to change the knowledge industry, tools for deep research, tools for sales, and implementing client solutions. We believe in AI's potential to empower people and organizations, and we work alongside our customers to solve hard problems with our exceptional team.
        </p>
        <p>
          Connect with me <a href="mailto:nitesh.pant@devdashlabs.com">via email</a> to collaborate on projects. Plus points for fintech and AI products!
        </p>
        <p>
          I love building products, creating amazing marketing ideas, thinking about philosophy (political economy), and bringing structure to madness. Talk to me about architecture, and we will have a good convo.
        </p>
      </div>
    </section>
  );
}
