import Image from "next/image";
import { socialLinks } from "./config";
import React from "react";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.jpg"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
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
          I'm the co-founder of <a target="blank" href="https://devdashlabs.com">DevDash Labs</a>, an applied AI research and development company. We build products to solve the hardest problems for our customers. Our mission is to ignite the AI revolution within organizations. DevDash Labs exists to do great work. This is powered by world-class Nepali talent with global ambitions.
        </p>
        <p>
          I grew up in Nepal, went to <a target="blank" href="https://www.dartmouth.edu"> Dartmouth College </a> (studied economics and government), and worked as a management consultant at <a target="blank" href="https://www.rolandberger.com">Roland Berger</a>. 
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
