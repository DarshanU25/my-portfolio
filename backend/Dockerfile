# Multi-stage build for Darshan Ubhale Portfolio (YARP Gateway + WebAPI)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy solution and project files for caching restore layer
COPY backend/Portfolio.slnx ./
COPY backend/Portfolio.WebApi/Portfolio.WebApi.csproj ./Portfolio.WebApi/
COPY backend/Portfolio.Gateway/Portfolio.Gateway.csproj ./Portfolio.Gateway/

RUN dotnet restore Portfolio.slnx

# Copy remaining source code
COPY backend/ ./

# Publish WebApi and Gateway
RUN dotnet publish Portfolio.WebApi/Portfolio.WebApi.csproj -c Release -o /app/out/webapi
RUN dotnet publish Portfolio.Gateway/Portfolio.Gateway.csproj -c Release -o /app/out/gateway

# Production runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Render uses dynamic PORT (defaults to 10000 or 8080)
EXPOSE 8080
EXPOSE 10000

COPY --from=build /app/out/webapi ./webapi
COPY --from=build /app/out/gateway ./gateway
COPY backend/entrypoint.sh ./entrypoint.sh

# Fix line endings and make script executable
RUN sed -i 's/\r$//' ./entrypoint.sh && chmod +x ./entrypoint.sh

ENV ASPNETCORE_ENVIRONMENT=Production
ENV WEBAPI_URL=http://127.0.0.1:5100

ENTRYPOINT ["./entrypoint.sh"]
