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

                <div className="my-8 max-w-none">
                    <h2 className="text-xl font-medium mb-4">From Dhangadhi to Dartmouth: A Journey Across Worlds</h2>
                    
                    <p className="mb-1 mt-1">There's something poetic about how life's most transformative journeys often begin with the simplest of moments. For me, it was a quiet morning in Dhangadhi, Nepal, coffee in hand, scrolling through the news—a ritual I've maintained for nearly a decade now.</p>
                    
                    <h3 className="text-lg font-medium mt-6 mb-3">The Headline That Changed Everything</h3>
                    
                    <p className="mb-1 mt-1">It was 2016, and I was in 10th grade when I spotted a headline that would alter my trajectory forever: a student had been accepted to all eight Ivy League universities. Two questions immediately surfaced in my mind:</p>
                    
                    <p className="italic mt-1 mb-1">Why was this student's achievement front-page news on what I considered the world's most prestigious news outlets?</p>
                    
                    <p className="mb-1 mt-1">And more fundamentally: <span className="italic mb-1 mt-1">ke ho yo "Ivy League"?</span> What exactly was this "Ivy League" that warranted global attention?</p>
                    
                    <p className="mb-1 mt-1">Curiosity ignited, I began researching. These weren't just good schools—they represented educational excellence on a global scale. In that moment of discovery, a quiet determination took root: if this person could achieve such recognition, perhaps I could too.</p>
                    
                    <h3 className="text-lg font-medium mt-6 mb-3">The Beautiful Obsession</h3>
                    
                    <p className="mb-1 mt-1">What followed was my first taste of true obsession—a focused dedication that transformed my approach to education. The Nepal government curriculum suddenly felt like merely a foundation rather than a ceiling.</p>
                    
                    <p className="mb-1 mt-1">I immersed myself in SAT preparation, expanded my English writing abilities beyond basic proficiency, and methodically researched every aspect of the American college application process. Each night after completing my regular schoolwork, I'd dive into this parallel education—learning about recommendation letters, personal statements, and the nuanced differences between these prestigious institutions.</p>
                    
                    <p className="mb-1 mt-1">My first SAT attempt yielded a 1380—<span className="italic">kasto niraasha lagyo</span>—what disappointment. But failure simply meant another opportunity to improve. The second attempt: 1510. Subject tests followed: Mathematics 780, Physics 730. With minimal TOEFL preparation (perhaps an excess of confidence), I scored 113.</p>
                    
                    <h3 className="text-lg font-medium mt-6 mb-3">Finding Purpose Beyond Admission</h3>
                    
                    <p className="mb-1 mt-1">Princeton ranked first in my dreams, primarily because of my passion for economics and international development. But when Dartmouth—my second choice—offered admission, I recognized it as the ideal environment for my growth.</p>
                    
                    <p className="mb-1 mt-1">The journey from Dhangadhi to Hanover represented more than geographical distance—it spanned cultural worlds, educational systems, and personal transformation. Navigating this path required not just academic preparation but emotional resilience and cultural adaptability.</p>
                    
                    <h3 className="text-lg font-medium mt-6 mb-3">The Foundations of Success</h3>
                    
                    <p className="mb-1 mt-1">None of this would have been possible without two essential pillars:</p>
                    
                    <p className="mb-1 mt-1">My parents, whose unwavering support manifested in both emotional encouragement and practical sacrifice. In a society where educational paths are often predetermined, they embraced my unconventional ambitions with open hearts.</p>
                    
                    <p className="mb-1 mt-1">And my dearest Taba..</p>
                    
                    <h3 className="text-lg font-medium mt-6 mb-3">Reflections on Transformation</h3>
                    
                    <p className="mb-1 mt-1">Looking back from my current vantage point, I see how this journey shaped not just my educational path but my approach to challenges. The process of getting to Dartmouth taught me more about determination, research methodology, and self-belief than perhaps any formal education could.</p>
                    
                    <p className="mb-1 mt-1">When people ask how a kid from Dhangadhi ended up at an Ivy League institution, the simple answer is through hard work and luck. But the deeper truth involves cultural bridge-building, intellectual curiosity, and the courage to envision possibilities beyond the visible horizon.</p>
                    
                    <p className="mb-1 mt-1">This story remains a work in progress—just as I continue evolving through each new chapter of my professional and personal life.</p>
                    
                    <p className="italic">To be continued...</p>
                </div>

                <p className="mb-2">
                    About the college: <a href="https://www.dartmouth.edu" className="text-blue-600 hover:underline">Dartmouth College</a> is a private Ivy League research university in Hanover, New Hampshire, United States. Established in 1769 by Eleazar Wheelock, it is the ninth-oldest institution of higher education in the United States and one of the nine colonial colleges chartered before the American Revolution. 
                </p>
            </section>
        </div>
    )
}