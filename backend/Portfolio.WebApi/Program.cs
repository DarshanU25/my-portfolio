using Microsoft.EntityFrameworkCore;
using Portfolio.WebApi.Data;
using Portfolio.WebApi.Repositories;
using Portfolio.WebApi.Repositories.Interfaces;
using Portfolio.WebApi.Services;
using Portfolio.WebApi.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Configure Controllers and JSON formatting
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// Configure EF Core Database (InMemory by default for Render portability, SQLite if connection string provided)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<PortfolioDbContext>(options =>
{
    if (!string.IsNullOrWhiteSpace(connectionString) && connectionString.Contains(".db"))
    {
        options.UseSqlite(connectionString);
    }
    else
    {
        options.UseInMemoryDatabase("DarshanPortfolioDb");
    }
});

// Register Repositories
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ISkillRepository, SkillRepository>();
builder.Services.AddScoped<IExperienceRepository, ExperienceRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();

// Register Application Services
builder.Services.AddSingleton<IPingService, PingService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ISkillService, SkillService>();
builder.Services.AddScoped<IExperienceService, ExperienceService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IAiFeatureService, AiFeatureService>();

// Register HTTP Client for AI external calls (Gemini/HuggingFace)
builder.Services.AddHttpClient();

// Configure CORS for local development and Vercel production frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowPortfolioClient", policy =>
    {
        policy.SetIsOriginAllowed(_ => true) // Allow Vercel preview & production domains
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Seed database on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    DbInitializer.Initialize(context);
}

// Enable CORS
app.UseCors("AllowPortfolioClient");

// Route Controllers
app.MapControllers();

// Fallback health check
app.MapGet("/", () => Results.Ok(new
{
    message = "Darshan Ubhale Portfolio WebAPI is running smoothly.",
    documentation = "Access endpoints at /api/projects, /api/skills, /api/experience, /api/ping, /api/ai/ask",
    status = "healthy"
}));

app.Run();
