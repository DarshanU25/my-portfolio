var builder = WebApplication.CreateBuilder(args);

// Read backend WebApi destination from environment or default to local port 5100
var webApiUrl = Environment.GetEnvironmentVariable("WEBAPI_URL") ?? "http://127.0.0.1:5100";

// Dynamically override cluster destination if environment variable is present
builder.Configuration["ReverseProxy:Clusters:webapi-cluster:Destinations:destination1:Address"] = webApiUrl;

// Add YARP Reverse Proxy
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Configure CORS to allow frontend calls
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Gateway Root & Info endpoint
app.MapGet("/", () => Results.Ok(new
{
    service = "Darshan Ubhale Portfolio YARP API Gateway",
    architecture = "YARP Reverse Proxy -> Web API Microservices/Controllers",
    downstreamTarget = webApiUrl,
    status = "Active & Healthy",
    endpoints = new[] { "/api/ping", "/api/projects", "/api/skills", "/api/experience", "/api/ai/ask", "/healthz" }
}));

// Direct Gateway Ping Signal (also routed to downstream if /api/ping is called)
app.MapGet("/gateway-health", () => Results.Ok(new
{
    status = "healthy",
    gateway = "YARP v2.3.0",
    serverTimeUtc = DateTime.UtcNow,
    uptimeSeconds = Environment.TickCount64 / 1000.0,
    keepAliveMessage = "YARP Gateway ping received. Preventing host spin-down."
}));

// Fallback healthz for Render health checks
app.MapGet("/healthz", () => Results.Ok("OK"));

// Map YARP Reverse Proxy
app.MapReverseProxy();

app.Run();
