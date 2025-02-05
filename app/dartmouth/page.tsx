// app/dartmouth/page.tsx
import WorldMapSection from "../dartmouth/world-map-section";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dartmouth",
    description: "How I went from a small town in Nepal to Dartmouth College",
  };

export default function Dartmouth() {
    return (
        <div>
            <WorldMapSection /> 
            <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding and max-width for text section */}
                <h1 className="mb-8 text-2xl font-medium tracking-tight">Dartmouth</h1>
                <h2>STILL A WORK IN PROGRESS</h2>
                <p className="mb-2">Many times, be it when I'm interviewing or talking to new folks, I get asked one question - how did you make it to Dartmouth?</p>
                <p className="mb-2">How did a kid born in Dhangadhi, Nepal go on to study at Dartmouth College in Hanover, NH?</p>
                <p className="mb-2">The answer lies in a lot of hard work, thoughtful planning, and luck. Not to mention immense support from my parents.</p>
                <p className="mb-2">To be continued...</p>

                <p className="mb-2">
                    Basic story: 
                    - saw a kid on the front page of the BBC
                    I was intrigued, why was a kid on the front page of the BBC? 
                    I wanted to find out more.
                    Looked up Ivy League
                    Learned that they are quite nice colleges 
                    Wanted to go to one, if not all
                    Worked very hard
                    Studied so many books, wrote so many essays, did so much research into the process, I became, quite frankly, obessed
                    This was my first taste of obession. 
                    Took my SAT, got 1380. Shit, what a bad score. So what, i will take it again. Took it again, got 1510. Took subject test - got maths 780, physics 730
                    TOEFL, almost no practice (fuck my confidence lowkey) and got 113
                    Wrote a lot of iterations
                    I was still in Dhangadhi 
                    Googled everything, read so much, 
                    Had to figure out everything about everything that is related to applying to colleges 
                    Thank you to my dad and mom for supporting me - I would never be here without them
                    Thank you to my dearest Taba, for everything. 



                </p>

                <p className="mb-2">
                    About the college: <a href="https://www.dartmouth.edu" className="text-blue-600 hover:underline">Dartmouth College</a> is a private Ivy League research university in Hanover, New Hampshire, United States. Established in 1769 by Eleazar Wheelock, it is the ninth-oldest institution of higher education in the United States and one of the nine colonial colleges chartered before the American Revolution. 
                </p>
            </section>
        </div>
    )
}