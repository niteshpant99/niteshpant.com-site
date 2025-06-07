export interface Project {
  title: string;
  subtitle: string;
  year: number;
  description: string;
  url: string;
  category: 'products' | 'client-solutions' | 'tools-opensource';
  status: 'live' | 'beta' | 'development' | 'open-source';
  featured: boolean;
  technologies?: string[];
}

export const projectCategories = {
  'products': {
    label: 'Products',
    description: 'End-to-end products and platforms I\'ve built,'
  },
  'client-solutions': {
    label: 'Client Solutions',
    description: 'Custom enterprise solutions and implementations'
  },
  'tools-opensource': {
    label: 'Tools & Open Source',
    description: 'Developer tools and open-source contributions'
  }
} as const;

export const projects: Project[] = [
  // Products
  {
    title: "Atlantis",
    subtitle: "Research Automation Platform",
    year: 2025,
    description: "A sophisticated research automation platform that embeds the power of deep research directly into your existing applications and workflows.",
    url: "https://atlantis.devdashlabs.com",
    category: 'products',
    status: 'beta',
    featured: true,
    technologies: ['AI Agents', 'Research Automation', 'API Integration', 'Web Scraping']
  },
  {
    title: "AI Lead Research and Outreach Platform",
    subtitle: "End-to-end Sales Automation",
    year: 2025,
    description: "Comprehensive platform for managing AI workshops from lead identification through pilot implementation with automated research and qualification.",
    url: "#",
    category: 'products',
    status: 'development',
    featured: true,
    technologies: ['CRM', 'Automation', 'AI Research', 'Lead Scoring', 'Email Automation']
  },
  {
    title: "Kafka",
    subtitle: "Content Generation Platform",
    year: 2024,
    description: "A content generation platform that automates the entire research, writing, and editing pipeline using multi-agent systems.",
    url: "https://devdashlabs.com",
    category: 'products',
    status: 'beta',
    featured: false,
    technologies: ['Multi-Agent Systems', 'Content AI', 'Automation', 'NLP']
  },
  {
    title: "Luna",
    subtitle: "Enterprise AI Chatbot",
    year: 2024,
    description: "Enterprise-grade AI chatbot designed for rapid deployment that integrates with your existing business knowledge using advanced RAG.",
    url: "https://devdashlabs.com/luna-demo",
    category: 'products',
    status: 'live',
    featured: true,
    technologies: ['RAG', 'LLMs', 'Enterprise Integration', 'Knowledge Management']
  },
  {
    title: "arthex",
    subtitle: "AI-Powered Trading Assistant",
    year: 2024,
    description: "AI powered earnings day trading assistant - earn on earnings. Analyzes Real-Time Holdings EXpertly for part-time investors.",
    url: "https://arthex.io/",
    category: 'products',
    status: 'development',  
    featured: true,
    technologies: ['AI/ML', 'Financial Data', 'Real-time Analytics', 'Next.js']
  },
  
  // Client Solutions
  {
    title: "Chemical Industry Intelligence Platform",
    subtitle: "Real-time Asset Monitoring",
    year: 2025,
    description: "AI-powered intelligence platform for global management consulting firm that transforms traditional Excel-based analysis into dynamic insights.",
    url: "#",
    category: 'client-solutions',
    status: 'development',
    featured: true,
    technologies: ['AI Intelligence', 'Real-time APIs', 'Cost Modeling', 'Data Analytics']
  },
  {
    title: "Prescription Verification Automation",
    subtitle: "Eyewear E-commerce Solution",
    year: 2025,
    description: "AI-powered system for leading online eyewear retailer that eliminated manual workload and reduced processing times from days to seconds.",
    url: "#",
    category: 'client-solutions',
    status: 'live',
    featured: false,
    technologies: ['Computer Vision', 'OCR', 'Automation', 'E-commerce']
  },
  
  // Tools & Open Source
  {
    title: "Nova Hospital Census app",
    subtitle: "Mobile Healthcare Tool",
    year: 2024,
    description: "Simple, open-source web-based census app optimized for mobile devices. Daily patient census taking and dashboard analytics.",
    url: "https://github.com/niteshpant99/nova-census-app",
    category: 'tools-opensource',
    status: 'open-source',
    featured: false,
    technologies: ['React', 'Mobile-First', 'Healthcare', 'Open Source']
  },
  {
    title: "InvestLens by DevDash Labs",
    subtitle: "AWS-Powered Document Intelligence",
    year: 2024,
    description: "Automated investment deck generation using Amazon Kendra, AWS Bedrock, and S3 storage for financial document analysis and synthesis.",
    url: "https://github.com/DevDashProducts/invest-lens",
    category: 'tools-opensource',
    status: 'open-source',
    featured: true,
    technologies: ['AWS Kendra', 'AWS Bedrock', 'RAG', 'Document AI']
  }
];
