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
  location: "Dallas, TX",
  email: "zkadtani@gmail.com",
  phone: "(469) 657-8285",
  linkedinUrl: "https://linkedin.com/in/zainadtani",
  siteUrl: "/",
  lastUpdated: "January 2025", // TODO: Update this when you update your resume
};

// ============= SUMMARY =============
// Edit your professional summary here
export const summary = `Results-oriented professional with a foundation in software engineering, 
tax advisory, and operations leadership. Known for building systems that simplify complex processes, 
improving efficiency, and delivering measurable results. Passionate about continuous learning, 
mentoring others, and leveraging technology to solve real-world problems.`;

// ============= KEY COMPETENCIES / SKILLS =============
// Edit skills and their tooltip descriptions here
export interface Skill {
  name: string;
  tooltip: string; // Shows on hover - add context about your experience
}

export const skills: Skill[] = [
  { name: "Software Development", tooltip: "Python, SQL, JavaScript, automation scripts" },
  { name: "Project Management", tooltip: "Agile methodologies, cross-functional team leadership" },
  { name: "Power BI", tooltip: "Dashboards, DAX basics, executive reporting" },
  { name: "Data Analysis", tooltip: "Excel, SQL queries, business intelligence" },
  { name: "Tax Advisory", tooltip: "IRS representation, compliance, individual & business returns" },
  { name: "Process Improvement", tooltip: "Workflow optimization, SOP development, efficiency gains" },
  { name: "Team Leadership", tooltip: "Mentoring, training programs, performance management" },
  { name: "Client Relations", tooltip: "Stakeholder communication, relationship building" },
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
    company: "Tax Advisors Group",
    title: "Enrolled Agent Tax Advisor",
    location: "Dallas, TX",
    dates: "Dec 2024 – Present",
    initialBullets: [
      "Represent clients before the IRS for audits, collections, and appeals",
      "Prepare and review individual and business tax returns ensuring compliance",
    ],
    expandedBullets: [
      "Advise clients on tax planning strategies to minimize liabilities",
      "Collaborate with team to streamline client onboarding processes",
    ],
  },
  {
    company: "American Airlines – Cargo Division",
    title: "IT Sr. Analyst / Software Engineer",
    location: "Dallas, TX",
    dates: "Jul 2022 – Nov 2024",
    initialBullets: [
      "Led development of internal tools reducing manual workload by 30%",
      "Built Power BI dashboards for executive leadership decision-making",
    ],
    expandedBullets: [
      "Managed cross-functional projects with global stakeholders",
      "Implemented automation scripts saving 15+ hours weekly",
      "Mentored junior analysts on SQL and data visualization best practices",
    ],
  },
  {
    company: "Ericsson",
    title: "Operations Manager",
    location: "Plano, TX",
    dates: "Jun 2018 – Jun 2022",
    initialBullets: [
      "Oversaw operations team of 20+ across multiple project sites",
      "Developed training programs improving team performance by 25%",
    ],
    expandedBullets: [
      "Streamlined reporting processes cutting delivery time by 40%",
      "Led client presentations and quarterly business reviews",
      "Implemented quality control measures reducing errors by 35%",
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
    institution: "University of Texas at Dallas",
    degree: "Bachelor of Science in Software Engineering",
    date: "May 2018",
    honors: ["Dean's List", "President's List"],
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
  { name: "Enrolled Agent (EA)", issuer: "IRS", date: "2024" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
  { name: "Mortgage Loan Originator (MLO)", issuer: "NMLS", date: "2023" },
  { name: "Life & Health Insurance License", issuer: "Texas", date: "2022" },
  { name: "QuickBooks Online ProAdvisor", issuer: "Intuit", date: "2024" },
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
    description: "Published children's book; created free EA exam prep course",
    icon: "book",
  },
  {
    title: "Open Source Contributor",
    description: "Contributing to developer tools and educational resources",
    icon: "code",
  },
  {
    title: "Community Volunteer",
    description: "Youth mentorship and financial literacy workshops",
    icon: "users",
  },
  {
    title: "Sports & Fitness",
    description: "Basketball, hiking, and marathon training",
    icon: "basketball",
  },
];

// ============= PDF DOWNLOAD =============
// TODO: Replace this path with your actual resume PDF
export const resumePdfPath = "/resume/ZainAdtani_Resume_2025.pdf";
