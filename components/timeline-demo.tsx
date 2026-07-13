import React from "react";
import { Timeline } from "./ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Co-founded DevDash Labs and spearheaded transformation into an applied AI research and development company. Built three core products while leading strategic client partnerships.
          </p>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Key Products Built:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🚀 <a href="https://atlantis.devdashlabs.com" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Atlantis</a> - Research automation platform for embedded intelligence workflows
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🤖 <a href="https://devdashlabs.com/products/luna" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Luna</a> - Enterprise AI chatbot with advanced RAG capabilities
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                📈 <a href="https://arthex.io" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Arthex</a> - AI-powered earnings analysis tool for retail investors
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Major Client Wins:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ⚡ Chemical Industry Intelligence Platform - Reducing analysis time from weeks to minutes
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🏥 Healthcare SaaS Brand Strategy - Complete brand overhaul and AI-powered customer support
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                👓 Prescription Verification Automation - Processing times reduced from days to seconds
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Graduated from Dartmouth College and joined Roland Berger as a Junior Consultant in Boston. Worked on high-impact projects including billion-dollar M&A deals and market analysis for global clients.
          </p>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Key Achievements:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                💼 Developed data-driven model for $5 billion M&A deal between global petrochemical companies
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🗾 Delivered market analysis of 3 US medical tech companies for Japan client team
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                📞 Led 50+ voice-of-customer call campaign creating new market-entry strategy
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Education Milestone:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🎓 Bachelor of Arts from Dartmouth College (Economics & Government)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🏆 Academic Citation for Meritorious Performance (top 2% of students)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                📊 Completed Tuck MBA Business Bridge Program
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Gained valuable experience in financial markets as a Hedge Fund Investment Intern at Blue Room Investing in Denver, while also deepening my involvement in Pearl Group&apos;s strategic operations.
          </p>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Finance Experience:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                📊 Quantitative analysis of 350+ pages of financial statements
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                📈 Created DCF model and presented short position investment thesis
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🔌 Daily market updates on EV charging industry using Bloomberg data
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2016-Present",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Ongoing leadership role at Pearl Group, our family&apos;s multi-service enterprise in Far-West Nepal. Since age 16, I&apos;ve been coordinating complex operations across education, healthcare, and infrastructure affecting 30,000+ people annually.
          </p>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Community Impact:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🏫 <strong>Axis Vidyashram:</strong> Educating 2,500+ students annually
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🏥 <strong>Nova Hospital:</strong> Healthcare for 30,000+ patients annually
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🏗️ <strong>Thegim Construction:</strong> Critical infrastructure development
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                💼 Managing 250+ employees across interconnected service lines
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Crisis Leadership:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🫁 Coordinated COVID-19 oxygen supply management during national shortage
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                🏗️ Managed hospital construction while maintaining uninterrupted services
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                📋 Developed operational frameworks for sustainable community impact
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
} 