import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Professional experience and background of Nitesh Pant",
};

export default function Work() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          Work
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          My journey spans from management consulting and hedge fund investing to co-founding an applied AI research and development company. I've led transformative projects across healthcare, petrochemicals, and fintech, from evaluating billion-dollar M&A deals to building AI products that drive measurable business impact. Currently focused on making AI accessible and practical for businesses of all sizes at DevDash Labs.
        </p>
      </div>

      {/* Experience Section */}
      <section className="space-y-8">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          Experience
        </h2>
        
        <div className="space-y-8">
          {/* DevDash Labs */}
          <div id="devdash" className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            
            {/* Date and Location */}
            <div className="md:col-span-1 space-y-1">
              <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                Jun 2024 - Present
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                New York, NY
              </div>
            </div>
            
            {/* Job Details */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  DevDash Labs
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Co-founder & CEO
                </p>
              </div>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Product, Design & Growth Lead.I design great products and experiences for people, solve complex problems for businesses as a forward-deployed engineer and strategist working onsite with clients, and manage this emerging applied AI research and development company. If you're in Nepal, and are an ambitious recent graduate, come work with us!
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Key Client Wins:</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Chemical Industry Intelligence Platform</strong>: Partnering with leading global management consulting firm to build real-time asset monitoring system, reducing analysis time from weeks to minutes
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Healthcare SaaS Brand Strategy</strong>: Delivered complete brand overhaul, GTM framework, and AI-powered customer support for anesthesia management platform, positioning client for accelerated growth
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Prescription Verification Automation</strong>: Engineered AI system for online eyewear retailer, reducing processing times from days to seconds while eliminating manual workload
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Products Built:</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong><a href="https://atlantis.devdashlabs.com" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Atlantis</a></strong>: Research automation platform for embedded intelligence workflows
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong><a href="https://devdashlabs.com/products/luna" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Luna</a></strong>: Enterprise AI chatbot with advanced RAG capabilities
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong><a href="https://arthex.io" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Arthex</a></strong>: AI-powered earnings analysis tool for retail investors
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pearl Group */}
          <div id="pearl-group" className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            
            {/* Date and Location */}
            <div className="md:col-span-1 space-y-1">
              <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                2016 - Present
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                Dhangadhi, Nepal
              </div>
            </div>
            
            {/* Job Details */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Pearl Group
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Strategic Operations Leader
                </p>
              </div>
              
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Contributing to strategic operations for our family's community-focused enterprise serving Far-West Nepal, a multi-service enterprise with NPR 500M+ annual turnover (~$3.75M USD). I've supported coordination across education, healthcare, and infrastructure divisions while managing 250+ employees across interconnected service lines affecting 30,000+ people annually.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Community Impact:</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Axis Vidyashram</strong>: Educating 2,500+ students annually, providing quality education access in a region with limited educational opportunities—grown from 150 students under my mother's visionary leadership
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Nova Hospital</strong>: Delivering essential healthcare to 30,000+ patients annually, bringing multi-specialty medical services to previously underserved Far-West communities
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Thegim Construction</strong>: Building critical infrastructure across the region while creating employment opportunities and developing community facilities that serve thousands of families
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Key Achievements:</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Crisis Response Leadership</strong>: Coordinated COVID-19 oxygen supply management across regional hospital network during national shortage, ensuring continued healthcare access for our entire community while working 80+ hours weekly
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Infrastructure Strategy</strong>: Designed and managed hospital facility construction projects, maintaining uninterrupted education and healthcare services for thousands of beneficiaries throughout expansion phases
                  </li>
                  <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                    <strong>Business Planning</strong>: Authored strategic growth proposals and operational frameworks enabling expanded community service capacity, including detailed expansion strategies presented to financial institutions
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Roland Berger */}
          <div id="roland-berger" className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            
            {/* Date and Location */}
            <div className="md:col-span-1 space-y-1">
              <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                Sep 2023 - Jun 2024
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                Boston, MA
              </div>
            </div>
            
            {/* Job Details */}
            <div className="md:col-span-3 space-y-3">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Roland Berger
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Junior Consultant
                </p>
              </div>
              
              <ul className="space-y-2">
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Developed data-driven model evaluating synergies and risks for $5 billion M&A deal between global petrochemical companies
                </li>
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Delivered comprehensive market analysis of 3 US medical tech companies, culminating in well-received presentation to Japan client team
                </li>
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Led 50+ voice-of-customer call campaign that created new market-entry strategy for specialty chemical company
                </li>
              </ul>
            </div>
          </div>

          {/* Blue Room Investing */}
          <div id="blue-room-investing" className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            
            {/* Date and Location */}
            <div className="md:col-span-1 space-y-1">
              <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                Jun 2022 - Aug 2022
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                Denver, CO
              </div>
            </div>
            
            {/* Job Details */}
            <div className="md:col-span-3 space-y-3">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Blue Room Investing
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Hedge Fund Investment Intern
                </p>
              </div>
              
              <ul className="space-y-2">
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Conducted quantitative analysis of 350+ pages of financial statements, resulting in successful investment strategy presentation to CEO
                </li>
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Created DCF model from scratch and presented short position investment thesis for public company to executive leadership
                </li>
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Delivered daily market updates to internal investment team on EV charging industry using Bloomberg and industry data
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="space-y-8 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          Education
        </h2>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            
            <div className="md:col-span-1 space-y-1">
              <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                2018 - 2023
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                Hanover, NH
              </div>
            </div>
            
            <div className="md:col-span-3 space-y-3">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Dartmouth College
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Bachelor of Arts (A.B.), Major in Economics & Minor in Government
                </p>
              </div>
              
              <ul className="space-y-2">
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Awarded an Academic Citation for Meritorious Performance (top 2% of students) for Critical Political Economy
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-l border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            
            <div className="md:col-span-1 space-y-1">
              <div className="text-sm font-mono text-neutral-500 dark:text-neutral-500">
                2023
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500">
                Hanover, NH
              </div>
            </div>
            
            <div className="md:col-span-3 space-y-3">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                  Tuck School of Business at Dartmouth
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Tuck MBA Business Bridge Program
                </p>
              </div>
              
              <ul className="space-y-2">
                <li className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-2 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></span>
                  Participated in selective 3-week pre-MBA program focusing on core business principles of accounting, finance, strategy, marketing, negotiation, communications, and economics; presented DCF-driven valuation to C-suite executives
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}