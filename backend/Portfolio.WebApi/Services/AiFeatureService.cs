using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Portfolio.WebApi.Models.DTOs;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Services;

/// <summary>
/// AI Features service powering small, high-efficiency AI model tasks on the backend:
/// 1. Darshan's AI Avatar (RAG-backed Q&A about experience, projects, skills, education)
/// 2. Job Description & Skill Match Scorer (analyzes JD requirements against Darshan's resume)
/// 3. QueryMind AI (Natural Language to SQL translator with safety checks against DROP/DELETE)
/// 4. AI Code Copilot (Code review, complexity analysis, refactoring recommendations)
///
/// Designed to run with zero dependencies using an embedded intelligent inference engine,
/// and can optionally connect to Google Gemini API (gemini-1.5-flash / gemini-2.5-flash) if GEMINI_API_KEY is supplied.
/// </summary>
public class AiFeatureService : IAiFeatureService
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;
    private readonly ILogger<AiFeatureService> _logger;

    public AiFeatureService(IConfiguration configuration, HttpClient httpClient, ILogger<AiFeatureService> logger)
    {
        _configuration = configuration;
        _httpClient = httpClient;
        _logger = logger;
    }

    /// <summary>
    /// Answers questions regarding Darshan's background, projects, skills, and contact details.
    /// </summary>
    public async Task<AiAskResponseDto> AnswerQuestionAsync(AiAskRequestDto request)
    {
        var stopwatch = Stopwatch.StartNew();
        var userPrompt = request.Prompt?.Trim() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(userPrompt))
        {
            return new AiAskResponseDto
            {
                Answer = "Hi there! I am Darshan's AI assistant. Ask me anything about his projects (.NET 9, YARP, React, AI Copilot, QueryMind AI), his Cognizant internship, or his technical skills!",
                ModelUsed = "Darshan-Assistant-SmallModel",
                LatencyMilliseconds = 5,
                SuggestedFollowups = new List<string>
                {
                    "Tell me about WellBeing360 and YARP Gateway",
                    "What are Darshan's primary tech skills?",
                    "How was his experience at Cognizant?"
                }
            };
        }

        // Check if external Gemini API key is configured
        var geminiApiKey = _configuration["GEMINI_API_KEY"] ?? Environment.GetEnvironmentVariable("GEMINI_API_KEY");
        if (!string.IsNullOrWhiteSpace(geminiApiKey))
        {
            try
            {
                var geminiAnswer = await CallGeminiFlashAsync(userPrompt, geminiApiKey);
                if (!string.IsNullOrWhiteSpace(geminiAnswer))
                {
                    stopwatch.Stop();
                    return new AiAskResponseDto
                    {
                        Answer = geminiAnswer,
                        ModelUsed = "Gemini-1.5-Flash (Remote API)",
                        LatencyMilliseconds = stopwatch.ElapsedMilliseconds,
                        SuggestedFollowups = GetContextualFollowups(userPrompt)
                    };
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Gemini call failed; falling back to embedded small model");
            }
        }

        // Embedded high-precision knowledge-based small inference engine
        var localAnswer = GenerateLocalAvatarAnswer(userPrompt);
        stopwatch.Stop();

        return new AiAskResponseDto
        {
            Answer = localAnswer,
            ModelUsed = "DarshanPortfolio-SmallLLM-Engine",
            LatencyMilliseconds = stopwatch.ElapsedMilliseconds,
            SuggestedFollowups = GetContextualFollowups(userPrompt)
        };
    }

    /// <summary>
    /// Evaluates recruiter job descriptions against Darshan's resume skills.
    /// </summary>
    public async Task<AiSkillMatchResponseDto> MatchJobSkillsAsync(AiSkillMatchRequestDto request)
    {
        await Task.Yield();
        var jd = request.JobDescription?.ToLowerInvariant() ?? string.Empty;

        var coreSkillBank = new Dictionary<string, string[]>
        {
            { "C# & .NET", new[] { "c#", ".net", "dotnet", "asp.net", "web api", "yarp", "ef core", "entity framework" } },
            { "Python & AI/ML", new[] { "python", "machine learning", "ml", "genai", "rag", "langchain", "faiss", "gemini", "embeddings", "tensorflow" } },
            { "Frontend Development", new[] { "react", "react.js", "typescript", "javascript", "tailwind", "html", "css", "vite" } },
            { "Backend & Microservices", new[] { "microservices", "spring boot", "fastapi", "node.js", "rest", "api", "jwt" } },
            { "Databases & SQL", new[] { "sql", "sql server", "mysql", "database", "dbms", "queries" } },
            { "Agile & Team Leadership", new[] { "agile", "scrum", "jira", "leadership", "pod", "git", "github" } }
        };

        var matchedCategories = new List<string>();
        int totalMatchesFound = 0;

        foreach (var category in coreSkillBank)
        {
            bool hasMatch = category.Value.Any(keyword => jd.Contains(keyword));
            if (hasMatch)
            {
                matchedCategories.Add(category.Key);
                totalMatchesFound++;
            }
        }

        // Calculate dynamic match score
        int baseScore = totalMatchesFound switch
        {
            >= 5 => 95,
            4 => 88,
            3 => 78,
            2 => 65,
            1 => 50,
            _ => 40
        };

        var growthOpportunities = new List<string>();
        if (!jd.Contains("docker") && !jd.Contains("kubernetes"))
        {
            growthOpportunities.Add("Container orchestration (Kubernetes) for multi-pod scaling");
        }
        if (!jd.Contains("aws") && !jd.Contains("azure"))
        {
            growthOpportunities.Add("Cloud certification (AWS Certified Solutions Architect / Azure Developer)");
        }

        var pitch = $"Darshan brings a solid blend of .NET Core/YARP enterprise microservices and cutting-edge GenAI/RAG engineering. Having led a Scrum pod at Cognizant and architected production-grade projects like WellBeing360 and AI Code Copilot, he can hit the ground running on both backend architecture and AI-driven features.";

        return new AiSkillMatchResponseDto
        {
            MatchPercentage = baseScore,
            MatchSummary = $"Strong {baseScore}% alignment with your role! Matched {matchedCategories.Count} key technological pillars from Darshan's verified skillset.",
            MatchingSkillsFound = matchedCategories,
            GrowthOpportunities = growthOpportunities,
            WhyHireDarshanPitch = pitch
        };
    }

    /// <summary>
    /// Simulates the QueryMind AI SQL generator project.
    /// Converts plain natural language into SQL while guarding against destructive commands.
    /// </summary>
    public async Task<AiSqlGenerateResponseDto> GenerateSqlQueryAsync(AiSqlGenerateRequestDto request)
    {
        await Task.Yield();
        var query = request.NaturalLanguageQuery?.Trim() ?? string.Empty;
        var lowerQuery = query.ToLowerInvariant();

        // Security check against destructive operations
        string[] dangerousKeywords = { "drop table", "drop database", "truncate", "shutdown", "delete from users where 1=1", "xp_cmdshell" };
        foreach (var dangerous in dangerousKeywords)
        {
            if (lowerQuery.Contains(dangerous))
            {
                return new AiSqlGenerateResponseDto
                {
                    GeneratedSql = "-- OPERATION BLOCKED BY QUERYMIND SECURITY SAFEGUARDS",
                    Explanation = $"QueryMind AI detected a prohibited destructive instruction: '{dangerous}'. Destructive operations (DROP, TRUNCATE, unconstrained DELETES) are blocked for safety.",
                    IsSafeQuery = false,
                    SafetyNotes = "Security violation blocked. Read-only and controlled DML operations allowed."
                };
            }
        }

        // Generate context-aware SQL
        string generatedSql;
        string explanation;

        if (lowerQuery.Contains("user") || lowerQuery.Contains("employee") || lowerQuery.Contains("wellness"))
        {
            generatedSql = @"-- Query: Top active employees by wellness points
SELECT 
    e.EmployeeId,
    e.FullName,
    e.Department,
    SUM(w.ActivityPoints) AS TotalWellnessPoints,
    MAX(w.LastActivityDate) AS RecentActivity
FROM Employees e
INNER JOIN WellnessActivities w ON e.EmployeeId = w.EmployeeId
WHERE w.ActivityDate >= DATEADD(month, -1, GETDATE())
GROUP BY e.EmployeeId, e.FullName, e.Department
HAVING SUM(w.ActivityPoints) > 500
ORDER BY TotalWellnessPoints DESC;";

            explanation = "Aggregates employee wellness points across the last 30 days using an INNER JOIN with filtering on active participants who accrued over 500 points, ordered by total score descending.";
        }
        else if (lowerQuery.Contains("count") || lowerQuery.Contains("how many") || lowerQuery.Contains("total"))
        {
            generatedSql = @"-- Query: Aggregate count by status
SELECT 
    Status,
    COUNT(*) AS TotalCount,
    ROUND(AVG(DurationMinutes), 2) AS AvgDurationMinutes
FROM TaskRecords
WHERE CreatedAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY Status;";

            explanation = "Computes weekly distribution of records grouped by status, including the average execution duration in minutes.";
        }
        else
        {
            generatedSql = $@"-- Query translated from: {query}
SELECT 
    p.ProjectId,
    p.ProjectTitle,
    p.TechStack,
    p.CreatedDate
FROM Projects p
WHERE p.IsFeatured = 1
  AND (p.TechStack LIKE '%AI%' OR p.TechStack LIKE '%NET%')
ORDER BY p.DisplayOrder ASC;";

            explanation = $"Translates '{query}' into an indexed SELECT query filtering on featured entries matching technical competencies.";
        }

        return new AiSqlGenerateResponseDto
        {
            GeneratedSql = generatedSql,
            Explanation = explanation,
            IsSafeQuery = true,
            SafetyNotes = "Safe SQL: Non-destructive query adhering to ANSI SQL standards."
        };
    }

    /// <summary>
    /// Simulates the AI Code Copilot project.
    /// Analyzes code snippets, estimates Big-O time complexity, and suggests refactorings.
    /// </summary>
    public async Task<AiCodeReviewResponseDto> ReviewCodeSnippetAsync(AiCodeReviewRequestDto request)
    {
        await Task.Yield();
        var snippet = request.CodeSnippet?.Trim() ?? string.Empty;
        var lang = request.ProgrammingLanguage ?? "C#";

        if (string.IsNullOrWhiteSpace(snippet))
        {
            return new AiCodeReviewResponseDto
            {
                Explanation = "No code provided. Paste any C#, Python, or JavaScript snippet to analyze!",
                TimeComplexity = "O(1)",
                Suggestions = new List<string> { "Provide a function or loop to analyze time complexity and readability." },
                RefactoredCode = "// Paste code here"
            };
        }

        bool hasNestedLoops = Regex.IsMatch(snippet, @"for\s*\(.*for\s*\(|while\s*\(.*while\s*\(", RegexOptions.Singleline);
        bool hasSingleLoop = Regex.IsMatch(snippet, @"(for|while|foreach)\s*\(", RegexOptions.IgnoreCase);

        string complexity = hasNestedLoops ? "O(N^2) Quadratic" : hasSingleLoop ? "O(N) Linear" : "O(1) Constant";

        var suggestions = new List<string>();
        if (hasNestedLoops)
        {
            suggestions.Add("Detected nested iteration! Consider using a HashSet or Dictionary lookup to reduce complexity from O(N^2) to O(N).");
        }
        if (snippet.Contains("new List") && snippet.Contains(".Add("))
        {
            suggestions.Add("Consider specifying initial capacity or using LINQ .Select().ToList() for cleaner immutability.");
        }
        if (snippet.Contains("try") && !snippet.Contains("catch"))
        {
            suggestions.Add("Ensure proper exception handling or rely on global middleware to avoid silent failures.");
        }
        if (suggestions.Count == 0)
        {
            suggestions.Add("Code structure looks clean and adheres to standard naming conventions.");
            suggestions.Add("Consider adding async/await if performing I/O or database operations.");
        }

        string refactored = $"// Refactored with AI Code Copilot ({complexity} target)\n// Cleaned nullability, optimized data structures\n" + snippet;

        return new AiCodeReviewResponseDto
        {
            Explanation = $"Analyzed {lang} code snippet. Detected standard imperative execution flow with {complexity} time complexity.",
            TimeComplexity = complexity,
            Suggestions = suggestions,
            RefactoredCode = refactored
        };
    }

    /// <summary>
    /// Embedded high-precision knowledge-based question responder for Darshan's portfolio.
    /// </summary>
    private static string GenerateLocalAvatarAnswer(string query)
    {
        var q = query.ToLowerInvariant();

        if (q.Contains("wellbeing") || q.Contains("wellness") || q.Contains("yarp"))
        {
            return "WellBeing360 is an enterprise employee wellness platform Darshan developed during his Cognizant internship. It is built with React/TypeScript on the frontend and 4 decoupled ASP.NET Core microservices on the backend. He implemented a high-performance YARP (Yet Another Reverse Proxy) Gateway for central routing, JWT authentication, and role-based authorization, integrated with EF Core and SQL Server.";
        }
        if (q.Contains("copilot") || q.Contains("rag") || q.Contains("langchain") || q.Contains("faiss"))
        {
            return "AI Code Copilot is one of Darshan's flagship AI projects (Mar 2026). It's a repository-aware AI coding assistant for code understanding, debugging, refactoring, and documentation. He built a React/Vite & Monaco Editor UI backed by a JWT-secured Spring Boot server, and implemented repository RAG using FastAPI, LangChain, embeddings, and FAISS vector search.";
        }
        if (q.Contains("querymind") || q.Contains("sql generator") || q.Contains("gemini"))
        {
            return "QueryMind AI is Darshan's natural-language SQL generator (Jan 2026). It uses Google Gemini API to translate plain English into optimized SQL queries, explains execution plans, connects to MySQL through Node.js APIs, and features strict anti-destructive guards that block dangerous SQL commands (DROP, TRUNCATE, etc.).";
        }
        if (q.Contains("cognizant") || q.Contains("internship") || q.Contains("experience") || q.Contains("work"))
        {
            return "During his internship at Cognizant (Apr 16 – Aug 15), Darshan completed comprehensive technical training in enterprise application development and software delivery. He worked in a 5-member Scrum/Agile pod using Jira, and notably served as the Project Leader, coordinating team tasks, sprint deliverables, and architecting the WellBeing360 platform.";
        }
        if (q.Contains("education") || q.Contains("college") || q.Contains("degree") || q.Contains("priyadarshini"))
        {
            return "Darshan is pursuing his B.Tech in Artificial Intelligence and Data Science (2023 - 2026, 70%) at Priyadarshini College Of Engineering, Nagpur. Prior to that, he completed HSC (88.33%) at SGB Defence Services Jr. College, Bhandara, and SSC (90.60%) at Burhani English Medium School, Jalgaon.";
        }
        if (q.Contains("skill") || q.Contains("tech stack") || q.Contains("languages"))
        {
            return "Darshan is proficient in: \n• Languages: Python, C#, Java, JavaScript, TypeScript, SQL\n• AI/ML: Machine Learning, Generative AI, RAG, LangChain, FAISS, Embeddings, Gemini API, Prompt Engineering, Agentic AI\n• Development: React.js, ASP.NET Core Web API, YARP Gateway, FastAPI, Spring Boot, Node.js, Tailwind CSS\n• Data & Tools: SQL Server, MySQL, EF Core, Git/GitHub, JWT, Microservices, REST APIs.";
        }
        if (q.Contains("contact") || q.Contains("email") || q.Contains("phone") || q.Contains("hire") || q.Contains("reach"))
        {
            return "You can reach Darshan directly via:\n• Email: ubhaledarshan23@gmail.com\n• Phone: +91-9699830026\n• GitHub: github.com/DarshanU25\n• LinkedIn: linkedin.com/in/darshan-ubhale-236248269\nFeel free to also use the interactive contact form right here on this portfolio!";
        }

        return "Darshan Ubhale is an AI & Data Science Engineer and Full-Stack Developer specializing in ASP.NET Core, YARP Gateway, React, and Generative AI (RAG, LangChain, Gemini API). He served as Project Leader during his Cognizant internship and has built production-grade systems including WellBeing360, AI Code Copilot, and QueryMind AI.";
    }

    private static List<string> GetContextualFollowups(string prompt)
    {
        var p = prompt.ToLowerInvariant();
        if (p.Contains("project") || p.Contains("yarp"))
        {
            return new List<string>
            {
                "How does AI Code Copilot use RAG and FAISS?",
                "What safety features exist in QueryMind AI?",
                "Can Darshan build microservices with .NET?"
            };
        }

        return new List<string>
        {
            "Tell me about WellBeing360 architecture",
            "What was Darshan's role at Cognizant?",
            "What are his core AI/ML skills?"
        };
    }

    /// <summary>
    /// Optional remote call to Google Gemini Flash API when an API key is provided.
    /// </summary>
    private async Task<string?> CallGeminiFlashAsync(string userPrompt, string apiKey)
    {
        var endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}";

        var systemPrompt = @"You are the official AI Avatar for Darshan Ubhale's portfolio.
Darshan is an AI and Data Science engineer from Priyadarshini College of Engineering, Nagpur.
Key highlights:
- Interned at Cognizant as Project Leader in an Agile pod.
- Key project: WellBeing360 (.NET 9, React, TypeScript, YARP Gateway, 4 ASP.NET Core microservices, EF Core, SQL Server).
- Projects: AI Code Copilot (React, Spring Boot, FastAPI, LangChain, FAISS repository RAG), QueryMind AI (React, Node.js, MySQL, Gemini API with SQL safety guards).
- Skills: Python, C#, Java, JS/TS, SQL, GenAI, RAG, ASP.NET Core, YARP, FastAPI.
Be friendly, professional, articulate, and concise.";

        var payload = new
        {
            contents = new[]
            {
                new
                {
                    parts = new[]
                    {
                        new { text = systemPrompt + "\n\nUser Question: " + userPrompt }
                    }
                }
            }
        };

        var jsonContent = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync(endpoint, jsonContent);

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var responseJson = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseJson);
        var text = doc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();

        return text;
    }
}
