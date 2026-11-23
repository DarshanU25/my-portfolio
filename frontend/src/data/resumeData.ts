export interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  category: 'Enterprise' | 'AI/ML' | 'FullStack';
  datePeriod: string;
  role: string;
  description: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  isFeatured: boolean;
  metrics?: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'AI/ML' | 'Development' | 'Data/Tools';
  proficiencyLevel: number;
  iconName: string;
  isHighlight: boolean;
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  keyProject: {
    title: string;
    description: string;
    technologies: string[];
  };
}

export interface EducationItem {
  institution: string;
  degree: string;
  specialization: string;
  score: string;
  location: string;
  period: string;
}

export const RESUME_DATA = {
  personalInfo: {
    name: 'Darshan Ubhale',
    title: 'AI & Data Science Engineer | Full Stack .NET & AI Developer',
    headline: 'Crafting scalable enterprise microservices with .NET 9 & YARP, and production RAG/LLM solutions.',
    phone: '+91-9699830026',
    email: 'ubhaledarshan23@gmail.com',
    github: 'https://github.com/DarshanU25',
    githubUsername: 'DarshanU25',
    linkedin: 'https://linkedin.com/in/darshan-ubhale-236248269',
    linkedinUsername: 'darshan-ubhale-236248269',
    location: 'Nagpur / Maharashtra, India',
    status: 'Open to Opportunities (AI/ML & Full-Stack)',
    summary:
      'Dedicated and results-oriented Artificial Intelligence And Data Science student with a strong academic background and a drive to solve real-world problems. Skilled in Java, Python, JavaScript, web, and database technologies. Quick to learn, adaptable, and effective in collaborative environments.',
  },

  education: [
    {
      institution: 'Priyadarshini College Of Engineering, Nagpur',
      degree: 'B.TECH',
      specialization: 'Artificial Intelligence and Data Science',
      score: 'Percentage - 70%',
      location: 'Nagpur, Maharashtra',
      period: '2023 - 2026',
    },
    {
      institution: 'SGB Defence Services Jr. College Shahapur, Bhandara',
      degree: 'HSC (Higher Secondary Certificate)',
      specialization: 'Science & Mathematics',
      score: 'Percentage - 88.33%',
      location: 'Bhandara, Maharashtra',
      period: '2020 - 2023',
    },
    {
      institution: 'Burhani English Medium School, Pachora, Jalgaon',
      degree: 'SSC (Secondary School Certificate)',
      specialization: 'General Academics',
      score: 'Percentage - 90.60%',
      location: 'Jalgaon, Maharashtra',
      period: '2019 - 2020',
    },
  ] as EducationItem[],

  experience: [
    {
      company: 'Cognizant',
      position: 'Intern & Project Leader',
      period: 'Apr 16 – Aug 15',
      location: 'Remote / Enterprise Campus',
      summary:
        'Completed comprehensive technical training focused on enterprise application development and software delivery practices. Served as Project Leader for an Agile pod.',
      responsibilities: [
        'Completed rigorous technical training focused on enterprise application development and software delivery practices.',
        'Worked in a 5-member Scrum/Agile pod, using Jira for sprint planning, velocity estimation, task tracking, and progress updates.',
        'Served as Project Leader, coordinating team activities, task allocation, code collaboration, and achieving project milestones on schedule.',
      ],
      keyProject: {
        title: 'WellBeing360 – Employee Wellness Platform',
        description:
          'Developed an employee wellness platform using React/TypeScript and four decoupled ASP.NET Core microservices. Implemented API routing through YARP Gateway with JWT authentication and role-based authorization. Integrated EF Core, SQL Server, and HTTP services for wellness points and HR/Finance reporting.',
        technologies: ['.NET 9', 'React', 'TypeScript', 'YARP', 'ASP.NET Core', 'EF Core', 'SQL Server', 'JWT', 'Microservices'],
      },
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 1,
      title: 'WellBeing360 – Employee Wellness Platform',
      subtitle: 'Enterprise Microservices with YARP Gateway & .NET 9',
      category: 'Enterprise',
      datePeriod: 'Jun 15 – Aug 10',
      role: 'Project Leader & Backend Architect (Cognizant)',
      description:
        'An enterprise-grade employee wellness platform developed during internship at Cognizant. Features 4 ASP.NET Core microservices communicating via HTTP and EF Core, centralized through a high-performance YARP Gateway with JWT and role-based authorization.',
      features: [
        'Developed using React/TypeScript frontend and 4 decoupled ASP.NET Core microservices.',
        'Implemented centralized API routing through YARP Gateway with JWT authentication and role-based authorization.',
        'Integrated Entity Framework Core, SQL Server, and inter-service HTTP communications for wellness point calculation and HR/Finance reporting.',
      ],
      techStack: ['.NET 9', 'React', 'TypeScript', 'YARP Gateway', 'ASP.NET Core', 'EF Core', 'SQL Server', 'JWT', 'Microservices'],
      githubUrl: 'https://github.com/DarshanU25',
      isFeatured: true,
      metrics: '4 Microservices • YARP Gateway • Role-based Auth',
    },
    {
      id: 2,
      title: 'AI Code Copilot',
      subtitle: 'Repository-Aware AI Assistant with RAG & Monaco Editor',
      category: 'AI/ML',
      datePeriod: 'Mar 2026',
      role: 'Full Stack & AI Engineer',
      description:
        'A repository-aware AI assistant built for code understanding, multi-file debugging, intelligent refactoring, and auto documentation. Powered by a FastAPI RAG pipeline using LangChain, embeddings, and FAISS vector database.',
      features: [
        'Built a repository-aware AI assistant for code understanding, debugging, refactoring, and documentation.',
        'Created a modern React/Vite, Tailwind CSS, and Monaco Editor interface paired with a JWT-secured Spring Boot backend.',
        'Implemented repository-wide RAG (Retrieval-Augmented Generation) using FastAPI, LangChain, semantic embeddings, and FAISS.',
      ],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Monaco Editor', 'FastAPI', 'Spring Boot', 'LangChain', 'FAISS', 'Embeddings', 'JWT'],
      githubUrl: 'https://github.com/DarshanU25',
      isFeatured: true,
      metrics: 'FAISS Vector RAG • Monaco Editor • Multi-repo Support',
    },
    {
      id: 3,
      title: 'QueryMind AI – SQL Query Generator',
      subtitle: 'Natural Language to SQL with Built-in Safeguards',
      category: 'AI/ML',
      datePeriod: 'Jan 2026',
      role: 'AI & Backend Developer',
      description:
        'A Gemini-powered tool that translates natural language prompts into optimized SQL queries, complete with query explanations, execution plans, and safeguards that strictly prevent destructive SQL operations.',
      features: [
        'Developed a Gemini-powered tool to generate, explain, and optimize SQL queries from natural-language business prompts.',
        'Connected a React frontend to Node.js APIs and MySQL for live sandbox query execution and result table display.',
        'Added query history tracking and intelligent security safeguards blocking destructive SQL operations (DROP, TRUNCATE, unchecked DELETES).',
      ],
      techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Gemini API', 'Prompt Engineering', 'Tailwind CSS'],
      githubUrl: 'https://github.com/DarshanU25',
      isFeatured: true,
      metrics: 'Gemini API • Destructive Query Guard • MySQL Sandbox',
    },
  ] as ProjectItem[],

  skills: [
    // Languages
    { name: 'Python', category: 'Languages', proficiencyLevel: 94, iconName: 'python', isHighlight: true },
    { name: 'C#', category: 'Languages', proficiencyLevel: 92, iconName: 'csharp', isHighlight: true },
    { name: 'Java', category: 'Languages', proficiencyLevel: 86, iconName: 'java', isHighlight: true },
    { name: 'JavaScript', category: 'Languages', proficiencyLevel: 90, iconName: 'javascript', isHighlight: true },
    { name: 'TypeScript', category: 'Languages', proficiencyLevel: 88, iconName: 'typescript', isHighlight: true },
    { name: 'SQL', category: 'Languages', proficiencyLevel: 92, iconName: 'sql', isHighlight: true },

    // AI/ML
    { name: 'Machine Learning', category: 'AI/ML', proficiencyLevel: 90, iconName: 'brain', isHighlight: true },
    { name: 'Generative AI', category: 'AI/ML', proficiencyLevel: 94, iconName: 'sparkles', isHighlight: true },
    { name: 'RAG Architecture', category: 'AI/ML', proficiencyLevel: 92, iconName: 'database', isHighlight: true },
    { name: 'LangChain', category: 'AI/ML', proficiencyLevel: 90, iconName: 'link', isHighlight: true },
    { name: 'FAISS & Embeddings', category: 'AI/ML', proficiencyLevel: 88, iconName: 'search', isHighlight: true },
    { name: 'Gemini API', category: 'AI/ML', proficiencyLevel: 95, iconName: 'bot', isHighlight: true },
    { name: 'Prompt Engineering', category: 'AI/ML', proficiencyLevel: 92, iconName: 'terminal', isHighlight: true },
    { name: 'TensorFlow', category: 'AI/ML', proficiencyLevel: 82, iconName: 'cpu', isHighlight: false },
    { name: 'MediaPipe', category: 'AI/ML', proficiencyLevel: 80, iconName: 'camera', isHighlight: false },
    { name: 'Agentic AI (Fundamentals)', category: 'AI/ML', proficiencyLevel: 85, iconName: 'bot', isHighlight: true },

    // Development
    { name: 'ASP.NET Core / Web API', category: 'Development', proficiencyLevel: 92, iconName: 'server', isHighlight: true },
    { name: 'YARP (Gateway)', category: 'Development', proficiencyLevel: 90, iconName: 'network', isHighlight: true },
    { name: 'React.js', category: 'Development', proficiencyLevel: 90, iconName: 'code', isHighlight: true },
    { name: 'FastAPI', category: 'Development', proficiencyLevel: 88, iconName: 'zap', isHighlight: true },
    { name: 'Spring Boot', category: 'Development', proficiencyLevel: 84, iconName: 'layers', isHighlight: true },
    { name: 'Node.js', category: 'Development', proficiencyLevel: 86, iconName: 'server', isHighlight: false },
    { name: 'Tailwind CSS', category: 'Development', proficiencyLevel: 92, iconName: 'layout', isHighlight: true },
    { name: 'HTML / CSS', category: 'Development', proficiencyLevel: 94, iconName: 'file-code', isHighlight: false },

    // Data/Tools
    { name: 'SQL Server', category: 'Data/Tools', proficiencyLevel: 90, iconName: 'database', isHighlight: true },
    { name: 'MySQL', category: 'Data/Tools', proficiencyLevel: 90, iconName: 'database', isHighlight: true },
    { name: 'EF Core', category: 'Data/Tools', proficiencyLevel: 90, iconName: 'code', isHighlight: true },
    { name: 'Git & GitHub', category: 'Data/Tools', proficiencyLevel: 92, iconName: 'git-branch', isHighlight: true },
    { name: 'JWT & Security', category: 'Data/Tools', proficiencyLevel: 90, iconName: 'shield', isHighlight: true },
    { name: 'Microservices & REST', category: 'Data/Tools', proficiencyLevel: 94, iconName: 'cloud', isHighlight: true },
    { name: 'OOP, DSA, DBMS', category: 'Data/Tools', proficiencyLevel: 92, iconName: 'cpu', isHighlight: true },
    { name: 'Visual Studio & VS Code', category: 'Data/Tools', proficiencyLevel: 95, iconName: 'terminal', isHighlight: false },
  ] as SkillItem[],

  achievements: [
    {
      title: 'Certified Cyber Security Workshop – 2 Hours Training',
      issuer: 'Thetechunique Academy',
      description:
        'Successfully completed a certified workshop on Cyber Security conducted by Thetechunique Academy, focusing on online threats, ethical hacking, and safety practices.',
      date: 'Completed',
    },
  ],
};
