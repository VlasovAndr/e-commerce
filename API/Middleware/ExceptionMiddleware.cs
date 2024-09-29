using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                string? json = null;

                if (env.IsDevelopment())
                {
                    var responseDev = new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString());
                    json = JsonSerializer.Serialize(responseDev);
                }
                else
                {
                    var responseProd = new ApiResponse((int)HttpStatusCode.InternalServerError);
                    json = JsonSerializer.Serialize(responseProd);
                }

                await context.Response.WriteAsync(json);
            }
        }
    }
}