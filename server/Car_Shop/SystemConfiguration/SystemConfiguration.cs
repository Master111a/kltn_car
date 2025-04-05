using CommonServices.Abstract;
using CommonServices.Implement;
using CommonServices.Payment;
using Database;
using DTOs;
using Mapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.Abstract;
using Repository.Implement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SystemServices.Abstract;
using SystemServices.Implement;


namespace SystemConfiguration
{
    public static class SystemConfiguration
    {
        public static void RegisterDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CarShopDBContext>(option => option.UseSqlServer(configuration.GetConnectionString("CarShopContext"),
                context => context.MigrationsAssembly(typeof(CarShopDBContext).Assembly.FullName)), ServiceLifetime.Transient);
        }

        public static void RegiterCors(this IServiceCollection services)
        {
            services.AddCors(option =>
                option.AddPolicy("AllowNextApp",
                builder =>
                {
                    builder.WithOrigins("http://localhost:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials()
                           .WithExposedHeaders("Content-Disposition");
                })
            );
        }
        public static void RegisterDI(this IServiceCollection services, IConfiguration configuration)
        {
            RegisterEmail(services, configuration);
            
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped(typeof(IAuthenticationServices), typeof(AuthenticationServices));
            services.AddScoped(typeof(IUserServices), typeof(UserServices));
            services.AddScoped(typeof(IPaymentService), typeof(PaymentService));
            services.AddScoped(typeof(ICarsService), typeof(CarsService));
            services.AddScoped(typeof(IBrandService), typeof(BrandService));
            services.AddScoped(typeof(ICategoryService), typeof(CategoryService));
            services.AddScoped(typeof(IModelService), typeof(ModelService));
            services.AddScoped<IEmailServices, EmailServices>();
        }

        public static void RegisterTokenBearer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = configuration["TokenBearer:Issuer"],
                        ValidateIssuer = true,
                        ValidAudience = configuration["TokenBearer:Audience"],
                        ValidateAudience = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenBearer:SignatureKey"])),
                        ValidateLifetime = true
                    };
                });
            //.AddGoogle(opt =>
            //{
            //    opt.ClientId = configuration["GoogleAuthenticationConfig:ClientId"];
            //    opt.ClientSecret = configuration["GoogleAuthenticationConfig:ClientSecret"];
            //});
        }

        public static void RegisterSwaggerGen(this IServiceCollection services)
        {
            services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                    });
                });
        }

        public static void RegiserMapper(this IServiceCollection service)
        {
            service.AddAutoMapper(typeof(UserMappings));
            service.AddAutoMapper(typeof(CarMappings));
            service.AddAutoMapper(typeof(BrandMappings));
            service.AddAutoMapper(typeof(CategoryMappings));
            service.AddAutoMapper(typeof(ModelMappings));
        }

        public static void RegisterEmail(this IServiceCollection services, IConfiguration configuration) {
            var emailConfig = configuration.GetSection("EmailConfiguration").Get<EmailConfigurationDTO>();
            services.AddSingleton(emailConfig);
        }

    }

}
