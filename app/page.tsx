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

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Hello world! I am Nitesh Pant.
      </h1>
      <h2 className="text-[#00693e] dark:text-[#a5d75f]">I seek impact.</h2>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm the half duo of <a target="blank" href="https://devdashlabs.com">DevDash Labs</a>. 
          I'm current creating <a target="blank" href="https://devdashlabs.com/arthex-waitlist">arthex</a>, an AI powered
          earnings day stock analyzer to help retail traders earn on earnings.
        </p>
        <p>
          I grew up in Nepal, went to Dartmouth College (studied economics and government), and worked as a management consultant. 
          Visit my other site: <a href="https://niteshpant.com.np">niteshpant.com.np</a>! 
        </p>
        <p>
          I started  DevDash Labs to provide research-backed AI solutions to SMBs and enterprises. At DevDash, we do the research so that our clients can focus on their core competencies - adding value to their customers. Connect with me <a href="mailto:nitesh.pant@devdashlabs.com">via email</a> to collaborate on projects. Plus points for fintech and AI products!
        </p>
        <p>
          I love building products, creating amazing marketing ideas, thinking about philosophy (political economy), and bringing structure to madness. Talk to me about architecture and we will have a good convo. 
        </p>
      </div>
    </section>
  );
}
