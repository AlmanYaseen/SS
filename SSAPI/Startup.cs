using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using SSBOL;
using SSDAL;

namespace SSAPI
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //var authpol = new AuthorizationPolicyBuilder()
            //                 .AddAuthenticationSchemes(new string[]
            //                  {
            //                      JwtBearerDefaults.AuthenticationScheme
            //                  })
            //                 .RequireAuthenticatedUser()
            //                 .Build();
            services.AddCors();
            services.AddControllers(opts => opts.Filters.Add(new AuthorizeFilter())) 
                    .AddNewtonsoftJson();
            services.AddDbContext<SSDbContext>();
            services.AddIdentity<SSUser, IdentityRole>()
                    .AddEntityFrameworkStores<SSDbContext>()
                    .AddDefaultTokenProviders();

            //// Step - 1: Creating signingKey from SecretKey

            //var signingkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this-is-my-jwt-secret-key"));

            ////Step-2: Create Validation Parameters using signingKey
            //var tokenValidationParameter = new TokenValidationParameters()
            //{
            //    IssuerSigningKey = signingkey,
            //    ValidateIssuer = false,
            //    ValidateAudience = false,
            //    ClockSkew = TimeSpan.Zero
            //};

            ////Step-3: Set Authentication Type as JWTBearer
            //services.AddAuthentication(x => x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme)

            ////Step-4: Set Validation Parameter Createed Above
            //.AddJwtBearer(jwt =>
            //{
            //    jwt.TokenValidationParameters = tokenValidationParameter;
            //});


            //Object State Management
            //PerRequest
            services.AddTransient<IStoryDb, StoryDb>();
            //Per User
            //services.AddScoped<IStoryDb, StoryDb>();

            //Global Object, Singleton
            //services.AddSingleton<IStoryDb, StoryDb>();



            services.ConfigureApplicationCookie(opt =>
            {
                opt.Events = new CookieAuthenticationEvents()
                {
                    //Authentication
                    OnRedirectToLogin = redirectContext =>
                    {
                        redirectContext.HttpContext.Response.StatusCode = 403;
                        return Task.CompletedTask;
                    },
                    //Authorizarion
                    OnRedirectToAccessDenied = redirectContext =>
                    {
                        redirectContext.HttpContext.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    }
                };
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            app.UseCors(opts => opts.WithOrigins("http://localhost:4200")
                                  .AllowAnyMethod()
                                   .AllowAnyHeader()
                                   .AllowCredentials());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
