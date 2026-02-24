 // CSIP6833 (2026)
// SS. Tshabalala (2018760260)
using API.Data;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(Opt =>
{
    Opt.UseSqlite(builder.Configuration.GetConnectionString("DefalutConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(x=>x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.MapControllers();

app.Run();
