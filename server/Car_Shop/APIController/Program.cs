using DTOs;
using Microsoft.Extensions.Configuration;
using System.Text.Json.Serialization;
using SystemConfiguration;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.RegisterDbContext(builder.Configuration);
builder.Services.RegiterCors();
builder.Services.RegisterDI(builder.Configuration);
builder.Services.RegisterSwaggerGen();
builder.Services.RegiserMapper();
builder.Services.RegisterEmail(builder.Configuration);
builder.Services.RegisterTokenBearer(builder.Configuration);
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers()
.AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Đặt UseCors trước các middleware Authentication và Authorization
app.UseCors("AllowNextApp");

app.UseAuthentication();
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
