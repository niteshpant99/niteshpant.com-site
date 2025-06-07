import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Professional experience and background of Nitesh Pant",
};

interface WorkExperience {
  startDate: string;
  endDate: string;
  company: string;
  position: string;
  location: string;
  description: string[];
}

interface Education {
  startYear: string;
  endYear: string;
  institution: string;
  degree: string;
  location: string;
  description: string[];
}

const workExperience: WorkExperience[] = [
  {
    startDate: "Jun 2024",
    endDate: "Present",
    company: "DevDash Labs",
    position: "Co-founder, Product & Growth Lead",
    location: "New York, NY",
    description: [
      "Spearheaded company transformation into AI research and solutions provider, growing team from 2 to 7 members and achieving 5x revenue growth",
      "Acquired and led $10K MRR digital transformation project for healthcare SaaS client by identifying data-driven decision opportunities",
      "Built scalable AI product development foundation by recruiting and managing distributed engineering team across multiple time zones"
    ]
  },
  {
    startDate: "Sep 2023",
    endDate: "Jun 2024",
    company: "Roland Berger",
    position: "Junior Consultant",
    location: "Boston, MA",
    description: [
      "Developed data-driven model evaluating synergies and risks for $5 billion M&A deal between global petrochemical companies",
      "Delivered comprehensive market analysis of 3 US medical tech companies, culminating in well-received presentation to Japan client team",
      "Led 50+ voice-of-customer call campaign that created new market-entry strategy for specialty chemical company"
    ]
  },
  {
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    company: "Blue Room Investing",
    position: "Hedge Fund Investment Intern",
    location: "Denver, CO",
    description: [
      "Conducted quantitative analysis of 350+ pages of financial statements, resulting in successful investment strategy presentation to CEO",
      "Created DCF model from scratch and presented short position investment thesis for public company to executive leadership",
      "Delivered daily market updates to internal investment team on EV charging industry using Bloomberg and industry data"
    ]
  },
  {
    startDate: "Oct 2020",
    endDate: "Sep 2021",
    company: "Thegim Construction Company",
    position: "Bid Manager & Supply Chain Coordinator",
    location: "Dhangadhi, Nepal",
    description: [
      "Won government contracts worth NRS 720 million through strategic market research, leading to 280% increase in projects under management",
      "Negotiated deals with 15+ suppliers and factories, achieving 15% cost savings while improving supply chain efficiency by 25%",
      "Developed Excel-based pricing models for 500+ goods, increasing computational efficiency by 33%"
    ]
  }
];

const education: Education[] = [
  {
    startYear: "2018",
    endYear: "2023",
    institution: "Dartmouth College",
    degree: "Bachelor of Arts (A.B.), Major in Economics & Minor in Government",
    location: "Hanover, NH",
    description: [
      "Awarded an Academic Citation for Meritorious Performance (top 2% of students) for Critical Political Economy"
    ]
  },
  {
    startYear: "2023",
    endYear: "2023",
    institution: "Tuck School of Business at Dartmouth",
    degree: "Tuck MBA Business Bridge Program",
    location: "Hanover, NH",
    description: [
      "Participated in a selective 3-week pre-MBA program, focusing on core business principles of accounting, finance, strategy, marketing, negotiation, communications, and economics; presented DCF-driven valuation to C-suite execs"
    ]
  }
];

export default function Work() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          Work
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            My journey spans from management consulting, hedge fund investing, to co-founding an AI research and development company. 
            I've led transformative projects across healthcare, petrochemicals, and fintech—from evaluating billion-dollar 
            M&A deals to building AI products that drive measurable business impact. Currently focused on making AI 
            accessible and practical for businesses of all sizes at DevDash Labs.       </p>
      </div>

      {/* Experience Section */}
      <section className="space-y-8">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          Experience
        </h2>
        
        <div className="space-y-8">
          {workExperience.map((job, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
              
              {/* Date and Location */}
              <div className="md:col-span-1 space-y-1">
                <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                  {job.startDate} - {job.endDate}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  {job.location}
                </div>
              </div>
              
              {/* Job Details */}
              <div className="md:col-span-3 space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {job.company}
                  </h3>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {job.position}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {job.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-8 border-t border-neutral-200 dark:border-neutral-800 pt-12">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          Education
        </h2>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
              <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
              
              {/* Date and Location */}
              <div className="md:col-span-1 space-y-1">
                <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                  {edu.startYear === edu.endYear ? edu.startYear : `${edu.startYear} - ${edu.endYear}`}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-500">
                  {edu.location}
                </div>
              </div>
              
              {/* Education Details */}
              <div className="md:col-span-3 space-y-3">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                    {edu.institution}
                  </h3>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {edu.degree}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {edu.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                      <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}