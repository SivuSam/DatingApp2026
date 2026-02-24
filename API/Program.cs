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
var app = builder.Build();

// Configure the HTTP request pipeline.


app.MapControllers();

app.Run();
