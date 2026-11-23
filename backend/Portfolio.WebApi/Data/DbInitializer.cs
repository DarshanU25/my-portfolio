using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Data;

/// <summary>
/// Seeds Darshan Ubhale's accurate resume data into the database on startup.
/// Ensures the portfolio has full rich content even on fresh container boots.
/// </summary>
public static class DbInitializer
{
    public static void Initialize(PortfolioDbContext context)
    {
        // Ensure database exists
        context.Database.EnsureCreated();

        // Seed Projects if empty
        if (!context.Projects.Any())
        {
            context.Projects.AddRange(
                new Project
                {
                    Title = "WellBeing360 – Employee Wellness Platform",
                    Subtitle = ".NET 9, React, TypeScript, YARP Gateway, Microservices",
                    Role = "Project Leader & Full Stack .NET Developer (Cognizant Internship)",
                    Category = "Enterprise",
                    DatePeriod = "Jun 15 – Aug 10",
                    TechStack = ".NET 9, React, TypeScript, YARP, ASP.NET Core, EF Core, SQL Server, JWT, Microservices, REST APIs",
                    Description = "Enterprise-grade employee wellness and benefits management ecosystem built using React/TypeScript and four decoupled ASP.NET Core microservices, united by a high-throughput YARP Gateway.",
                    Features = "• Architected 4 decoupled ASP.NET Core microservices handling wellness points, tracking, rewards, and HR reporting.\n• Implemented secure API routing through YARP Gateway with central JWT authentication and role-based authorization.\n• Integrated EF Core with SQL Server and asynchronous inter-service HTTP communications for wellness point recalculations and HR/Finance reports.",
                    GithubUrl = "https://github.com/DarshanU25",
                    LiveDemoUrl = null,
                    IsFeatured = true,
                    DisplayOrder = 1
                },
                new Project
                {
                    Title = "AI Code Copilot",
                    Subtitle = "Repository-Aware AI Coding & Debugging Assistant",
                    Role = "Lead Developer & AI Architect",
                    Category = "AI/ML",
                    DatePeriod = "Mar 2026",
                    TechStack = "React, Vite, Tailwind CSS, Monaco Editor, Spring Boot, FastAPI, LangChain, FAISS, Embeddings, JWT",
                    Description = "An intelligent, repository-aware developer assistant for understanding large codebases, debugging complex stack traces, refactoring methods, and generating automated documentation.",
                    Features = "• Built a clean React/Vite and Monaco Editor web interface connected to a JWT-secured Spring Boot backend.\n• Implemented repository RAG (Retrieval-Augmented Generation) pipeline using FastAPI, LangChain, vector embeddings, and FAISS vector store.\n• Enables semantic search across multi-file repositories with contextual reasoning and automated refactoring suggestions.",
                    GithubUrl = "https://github.com/DarshanU25",
                    LiveDemoUrl = null,
                    IsFeatured = true,
                    DisplayOrder = 2
                },
                new Project
                {
                    Title = "QueryMind AI – SQL Query Generator",
                    Subtitle = "Natural Language to SQL with Built-in Safeguards",
                    Role = "Full Stack & AI Engineer",
                    Category = "AI/ML",
                    DatePeriod = "Jan 2026",
                    TechStack = "React, Node.js, Express, MySQL, Gemini API, Prompt Engineering, Tailwind CSS",
                    Description = "A Gemini-powered tool that converts plain English business questions into performant, dialect-accurate SQL queries with automated explanations and strict anti-destructive security filters.",
                    Features = "• Engineered prompt pipelines with Google Gemini API to translate natural language into optimized SQL queries.\n• Connected React frontend to Node.js REST APIs and MySQL for live sandbox query execution and interactive table result display.\n• Integrated query history and rigorous safety guards blocking destructive operations (DROP, TRUNCATE, unindexed massive updates).",
                    GithubUrl = "https://github.com/DarshanU25",
                    LiveDemoUrl = null,
                    IsFeatured = true,
                    DisplayOrder = 3
                }
            );
        }

        // Seed Skills if empty
        if (!context.Skills.Any())
        {
            var skills = new List<Skill>
            {
                // Languages
                new Skill { Name = "Python", Category = "Languages", ProficiencyLevel = 92, IconName = "python", IsHighlight = true },
                new Skill { Name = "C#", Category = "Languages", ProficiencyLevel = 90, IconName = "csharp", IsHighlight = true },
                new Skill { Name = "Java", Category = "Languages", ProficiencyLevel = 85, IconName = "java", IsHighlight = true },
                new Skill { Name = "JavaScript", Category = "Languages", ProficiencyLevel = 90, IconName = "javascript", IsHighlight = true },
                new Skill { Name = "TypeScript", Category = "Languages", ProficiencyLevel = 88, IconName = "typescript", IsHighlight = true },
                new Skill { Name = "SQL", Category = "Languages", ProficiencyLevel = 92, IconName = "sql", IsHighlight = true },

                // AI / ML
                new Skill { Name = "Machine Learning", Category = "AI/ML", ProficiencyLevel = 90, IconName = "ml", IsHighlight = true },
                new Skill { Name = "Generative AI", Category = "AI/ML", ProficiencyLevel = 94, IconName = "genai", IsHighlight = true },
                new Skill { Name = "RAG & Vector Stores", Category = "AI/ML", ProficiencyLevel = 92, IconName = "rag", IsHighlight = true },
                new Skill { Name = "LangChain", Category = "AI/ML", ProficiencyLevel = 90, IconName = "langchain", IsHighlight = true },
                new Skill { Name = "FAISS & Embeddings", Category = "AI/ML", ProficiencyLevel = 88, IconName = "faiss", IsHighlight = true },
                new Skill { Name = "Gemini API", Category = "AI/ML", ProficiencyLevel = 95, IconName = "gemini", IsHighlight = true },
                new Skill { Name = "Prompt Engineering", Category = "AI/ML", ProficiencyLevel = 92, IconName = "prompt", IsHighlight = true },
                new Skill { Name = "TensorFlow", Category = "AI/ML", ProficiencyLevel = 82, IconName = "tensorflow", IsHighlight = false },
                new Skill { Name = "MediaPipe", Category = "AI/ML", ProficiencyLevel = 80, IconName = "mediapipe", IsHighlight = false },
                new Skill { Name = "Agentic AI (Fundamentals)", Category = "AI/ML", ProficiencyLevel = 85, IconName = "agentic", IsHighlight = true },

                // Development & Frameworks
                new Skill { Name = "ASP.NET Core / Web API", Category = "Development", ProficiencyLevel = 92, IconName = "dotnet", IsHighlight = true },
                new Skill { Name = "YARP (Gateway)", Category = "Development", ProficiencyLevel = 90, IconName = "yarp", IsHighlight = true },
                new Skill { Name = "React.js", Category = "Development", ProficiencyLevel = 90, IconName = "react", IsHighlight = true },
                new Skill { Name = "FastAPI", Category = "Development", ProficiencyLevel = 88, IconName = "fastapi", IsHighlight = true },
                new Skill { Name = "Spring Boot", Category = "Development", ProficiencyLevel = 84, IconName = "springboot", IsHighlight = true },
                new Skill { Name = "Node.js", Category = "Development", ProficiencyLevel = 86, IconName = "nodejs", IsHighlight = false },
                new Skill { Name = "Tailwind CSS", Category = "Development", ProficiencyLevel = 92, IconName = "tailwind", IsHighlight = true },
                new Skill { Name = "HTML / CSS", Category = "Development", ProficiencyLevel = 95, IconName = "htmlcss", IsHighlight = false },

                // Data & Tools
                new Skill { Name = "SQL Server", Category = "Data/Tools", ProficiencyLevel = 90, IconName = "sqlserver", IsHighlight = true },
                new Skill { Name = "MySQL", Category = "Data/Tools", ProficiencyLevel = 90, IconName = "mysql", IsHighlight = true },
                new Skill { Name = "EF Core", Category = "Data/Tools", ProficiencyLevel = 90, IconName = "efcore", IsHighlight = true },
                new Skill { Name = "Git / GitHub", Category = "Data/Tools", ProficiencyLevel = 92, IconName = "git", IsHighlight = true },
                new Skill { Name = "JWT & Auth", Category = "Data/Tools", ProficiencyLevel = 90, IconName = "jwt", IsHighlight = true },
                new Skill { Name = "REST APIs & Microservices", Category = "Data/Tools", ProficiencyLevel = 94, IconName = "microservices", IsHighlight = true },
                new Skill { Name = "OOP, DSA, DBMS", Category = "Data/Tools", ProficiencyLevel = 92, IconName = "csfundamentals", IsHighlight = true },
                new Skill { Name = "Visual Studio / VS Code", Category = "Data/Tools", ProficiencyLevel = 95, IconName = "vscode", IsHighlight = false }
            };

            context.Skills.AddRange(skills);
        }

        // Seed Experience if empty
        if (!context.Experiences.Any())
        {
            context.Experiences.Add(
                new Experience
                {
                    Company = "Cognizant",
                    Position = "Intern (Project Leader)",
                    Period = "Apr 16 – Aug 15",
                    Location = "Maharashtra, India",
                    Summary = "Enterprise application development internship focused on cloud-native practices, Agile/Scrum leadership, and full-stack development with .NET 9 and modern frontend.",
                    Responsibilities = "• Completed rigorous technical training focused on enterprise application development, clean architecture, and software delivery practices.\n• Worked in a 5-member Scrum/Agile pod, utilizing Jira for sprint planning, velocity estimation, backlog grooming, and daily standups.\n• Served as Project Leader, coordinating team activities, task allocation, code reviews, collaboration, and project milestone deliveries.",
                    KeyProjectTitle = "WellBeing360 – Employee Wellness Platform",
                    KeyProjectDescription = "Spearheaded the development of a wellness management platform with 4 ASP.NET Core microservices, YARP reverse proxy gateway, JWT security, and React/TypeScript portal.",
                    TechnologiesUsed = ".NET 9, ASP.NET Core Web API, YARP, React, TypeScript, EF Core, SQL Server, Jira, Agile"
                }
            );
        }

        // Seed Education if empty
        if (!context.Educations.Any())
        {
            context.Educations.AddRange(
                new Education
                {
                    Institution = "Priyadarshini College Of Engineering, Nagpur",
                    Degree = "B.TECH",
                    Specialization = "Artificial Intelligence and Data Science",
                    Score = "Percentage: 70%",
                    Location = "Nagpur, Maharashtra",
                    Period = "2023 - 2026",
                    DisplayOrder = 1
                },
                new Education
                {
                    Institution = "SGB Defence Services Jr. College Shahapur, Bhandara",
                    Degree = "HSC (Higher Secondary Certificate)",
                    Specialization = "Science & Mathematics",
                    Score = "Percentage: 88.33%",
                    Location = "Bhandara, Maharashtra",
                    Period = "2020 - 2023",
                    DisplayOrder = 2
                },
                new Education
                {
                    Institution = "Burhani English Medium School, Pachora, Jalgaon",
                    Degree = "SSC (Secondary School Certificate)",
                    Specialization = "General Academics",
                    Score = "Percentage: 90.60%",
                    Location = "Jalgaon, Maharashtra",
                    Period = "2019 - 2020",
                    DisplayOrder = 3
                }
            );
        }

        context.SaveChanges();
    }
}
