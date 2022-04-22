using HR_Portalgrad.Models;
using HR_Portalgrad.Services;
using HR_Portalgrad.Services.PasswordHashers;
using HR_Portalgrad.Services.TokenGenerators;
using HR_Portalgrad.Services.UserReporsitories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HR_Portalgrad.Services.JobsReporsitories;
using Newtonsoft.Json.Serialization;
using HR_Portalgrad.Services.ApplicantsReporsitories;

namespace HR_Portalgrad
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        { 


            services.AddControllers();

            //Enable CORS
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());
            });
            //JSON Serializer
            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                = new DefaultContractResolver());


            AuthConfig authConfig = new AuthConfig();
            _configuration.Bind("Authentication", authConfig);
            services.AddSingleton(authConfig);
            string connectionString = _configuration.GetConnectionString("Connections");
            services.AddDbContextPool<AuthDBContext>(o => o.UseSqlServer(connectionString));
            services.AddSingleton<AccessTokenGenerator>();
            services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();
            services.AddScoped<IUserReporsitory, DbUserReporsitory>();
            services.AddScoped<IJobReporsitory,DbJobReporsitory>();
            services.AddScoped<IApplicantsReporsitory, DbApplicantsReporsitory>();



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            //Enable CORS
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
