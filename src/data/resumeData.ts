/**
 * Resume Data File
 * ================
 * Edit this file to update your interactive resume content.
 * All sections are clearly labeled for easy editing.
 */

// ============= CONTACT INFO =============
// Edit your contact details here
export interface ContactInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  siteUrl: string;
  lastUpdated: string; // Format: "Month Year" e.g., "January 2025"
}

export const contactInfo: ContactInfo = {
  name: "Zain Adtani",
  location: "Euless, TX",
  email: "zkadtani@gmail.com",
  phone: "817-629-8220",
  linkedinUrl: "https://linkedin.com/in/zainadtani",
  siteUrl: "/",
  lastUpdated: "October 2026",
};

// ============= SUMMARY =============
// Edit your professional summary here
export const summary = `Licensed insurance agent, mortgage loan originator, data analyst, and AI consultant with a career built on regulated client work: reviewing applications and supporting documentation, analyzing financial records, applying federal and state rules accurately, and guiding clients through multi-step processes from intake to decision. Power BI developer whose dashboards identified $5M+ in efficiency improvements. Founder of an AI consulting firm helping local businesses with visibility, websites, and automation. Self-published author and educator who has tutored 100+ students. Fluent in English, Hindi, Urdu, and Gujarati.`;

// ============= KEY COMPETENCIES / SKILLS =============
// Edit skills and their tooltip descriptions here
export interface Skill {
  name: string;
  tooltip: string; // Shows on hover - add context about your experience
}

export const skills: Skill[] = [
  { name: "Insurance & Financial Services", tooltip: "Life and health insurance, final expense coverage, applications and compliance" },
  { name: "Mortgage Lending", tooltip: "FHA and jumbo loan origination, credit and financial analysis, documentation review" },
  { name: "AI Consulting", tooltip: "AI visibility, one-page websites, booking links, and simple automation for local businesses" },
  { name: "Power BI", tooltip: "Dashboards, DAX, data modeling, executive reporting" },
  { name: "Data Analysis", tooltip: "SQL, Python, Excel, business intelligence" },
  { name: "Process Improvement", tooltip: "Reporting automation, workflow optimization, efficiency gains" },
  { name: "Team Leadership", tooltip: "Training and mentoring agents and junior analysts" },
  { name: "Client Relations", tooltip: "Guiding clients through multi-step processes in plain language" },
];

// ============= PROFESSIONAL EXPERIENCE =============
// Edit your work history here
// - initialBullets: Always shown (1-2 items)
// - expandedBullets: Shown when user clicks "Show more" (remaining items)
export interface ExperienceItem {
  company: string;
  title: string;
  location: string;
  dates: string;
  initialBullets: string[]; // Always visible (keep to 1-2)
  expandedBullets: string[]; // Revealed on "Show more"
}

export const experience: ExperienceItem[] = [
  {
    company: "Hegemon Group International (HGI)",
    title: "Licensed Life & Health Insurance Agent (Rank: MD)",
    location: "Texas",
    dates: "Jun 2021 – Present",
    initialBullets: [
      "Help families select life insurance and final expense coverage matched to their needs and budgets, explaining policy terms, costs, and application requirements in plain language",
      "Conduct client meetings to assess needs, complete applications, and assemble the documentation required for underwriting review",
    ],
    expandedBullets: [
      "Prepare and submit accurate, complete application and compliance paperwork under Texas and Georgia insurance regulations",
      "Follow cases through approval, respond to carrier requests, and keep clients informed at each stage",
      "Build and mentor a small team of agents, training them on products, application procedures, and compliance standards",
    ],
  },
  {
    company: "Certys Financial Inc",
    title: "Mortgage Loan Originator",
    location: "Dallas, TX",
    dates: "Sep 2024 – Present",
    initialBullets: [
      "Guide clients through FHA and jumbo mortgage applications from initial consultation to decision, ensuring compliance with lending regulations at every stage",
      "Analyze client financial statements and credit histories to recommend tailored loan solutions and determine documentation needs",
    ],
    expandedBullets: [
      "Verify the completeness and accuracy of application documentation before files move forward for decision",
      "Collaborate with underwriters and processors to expedite approvals, resolve conditions, and keep clients informed throughout the process",
    ],
  },
  {
    company: "Adtani Education Ventures LLC",
    title: "Founder and AI Consultant",
    location: "Euless, TX",
    dates: "May 2026 – Present",
    initialBullets: [
      "Help local businesses improve their AI visibility and online presence, including one-page websites, booking links, and simple automation of routine business tasks",
      "Consult with business owners to assess their needs and recommend practical technology solutions",
    ],
    expandedBullets: [
      "Deliver monthly content, website updates, and check-ins for client businesses",
      "Research tools and build repeatable service packages that small businesses can adopt without technical staff",
    ],
  },
  {
    company: "Colaberry School of Data Analytics",
    title: "Power BI Developer",
    location: "Plano, TX",
    dates: "Aug 2023 – Sep 2024",
    initialBullets: [
      "Designed 10+ operational dashboards identifying $5M+ in efficiency improvements for business stakeholders",
      "Automated reporting workflows, reducing data retrieval times by 15%",
    ],
    expandedBullets: [
      "Built dashboards visualizing sales trends, customer data, and operational metrics to support business reporting needs",
      "Mentored junior analysts, increasing data processing productivity by 20%",
    ],
  },
  {
    company: "Luke Barousse",
    title: "YouTube Content Developer",
    location: "Remote",
    dates: "Jun 2022 – Aug 2023",
    initialBullets: [
      "Developed a capstone analyzing the data science job market using web-scraped data",
      "Co-created the \"ChatGPT for Data Analytics\" course, teaching AI integration and real-world data analysis",
    ],
    expandedBullets: [
      "Broke down tools such as SQL and Python into lessons accessible to entry-level learners",
    ],
  },
];

// ============= EDUCATION =============
// Edit your education history here
export interface EducationItem {
  institution: string;
  degree: string;
  date: string;
  honors?: string[];
}

export const education: EducationItem[] = [
  {
    institution: "University of Texas at San Antonio",
    degree: "Bachelor of Science in Mechanical Engineering",
    date: "May 2022",
    honors: ["Dean's List", "President's List", "Alpha Kappa Psi", "ASME"],
  },
];

// ============= CERTIFICATIONS =============
// Edit your licenses and certifications here
export interface CertificationItem {
  name: string;
  issuer?: string;
  date?: string;
}

export const certifications: CertificationItem[] = [
  { name: "Life & Health Insurance License", issuer: "Texas (also licensed in Georgia)", date: "2022" },
  { name: "Mortgage Loan Originator (MLO)", issuer: "NMLS ID 2579708", date: "2023" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
  { name: "QuickBooks Online ProAdvisor Level 2", issuer: "Intuit" },
];

// ============= EXTRACURRICULAR ACTIVITIES =============
// Edit your activities and interests here
export interface ActivityItem {
  title: string;
  description: string;
  icon: "book" | "code" | "users" | "basketball" | "globe" | "heart";
}

export const activities: ActivityItem[] = [
  {
    title: "Author & Course Creator",
    description: "Self-published children's book author and co-creator of the ChatGPT for Data Analytics course",
    icon: "book",
  },
  {
    title: "Tutor & Educator",
    description: "Tutored 100+ students in math and science",
    icon: "users",
  },
  {
    title: "Community Volunteer",
    description: "Youth mentorship and financial literacy workshops",
    icon: "heart",
  },
  {
    title: "Sports & Fitness",
    description: "Basketball and football",
    icon: "basketball",
  },
];

// ============= PDF DOWNLOAD =============
// TODO: Replace this path with your actual resume PDF
export const resumePdfPath = "https://drive.google.com/uc?export=download&id=1ph2Lme47kH_f8OSfAp9xK99VS2oDSQls";
