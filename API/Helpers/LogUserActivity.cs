using API.Extensions;
using API.Interfaces.UserRepository;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var result = await next();

            if (!result.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = result.HttpContext.User.GetUserId();
            var repo = result.HttpContext.RequestServices.GetService<IUserRepository>();

            var user = await repo.GetUserById(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}