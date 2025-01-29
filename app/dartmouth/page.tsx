// app/dartmouth/page.tsx

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dartmouth",
    description: "How I went from a small town in Nepal to Dartmouth College",
  };

export default function Dartmouth() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-medium tracking-tight">Dartmouth</h1>
            
            <p className="mb-2">Many times, be it when I'm interviewing or talking to new folks, I get asked one question - how did you make it to Dartmouth?</p>
            <p className="mb-2">How did a kid born in Dhangadhi, Nepal go on to study at Dartmouth College in Hanover, NH?</p>
            <p className="mb-2">The answer lies in a lot of hard work, thoughtful planning, and luck. Not to mention immense support from my parents.</p>
            <p className="mb-2">But the journey was not easy. It was filled with ups and downs, moments of joy and moments of despair. (Cursour Tab wrote this!?)</p>
        </section>
    )
}