export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "DevDash Labs",
    year: 2024,
    description:
      "Building an AI Research & Development company, with an aim to empower SMBs with AI agents.",
    url: "https://devdashlabs.com/",
  },
  {
    title: "arthex",
    year: 2024,
    description:
      "AI powered earnings day trading assistant - earn on earnings.",
    url: "https://arthex.io/",
  },
  {
    title: "Nova Hospital Census app",
    year: 2025,
    description:
      "Simple, open-source web-based census app optimized for mobile devices. Daily patient census taking and dashboard analytics.",
    url: "https://github.com/niteshpant99/nova-census-app",
  },
  {
    title: "Luna",
    year: 2024,
    description:
      "Chatbot with AI capabilities, built on enterprise-grade, for SMBs; flexible and nimble to be integrated anywhere.",
    url: "https://devdashlabs.com/luna-demo",
  },
];
