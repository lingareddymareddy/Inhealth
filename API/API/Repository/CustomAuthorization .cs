using DB;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Net;

namespace BlogAPI
{
    [AttributeUsage(AttributeTargets.All)]
    public class CustomAuthorization : Attribute, IAuthorizationFilter
    {
        private readonly BlogContext _context;
        public CustomAuthorization():this (new BlogContext())
        {
        }
        public CustomAuthorization(BlogContext context)
        {
            _context = context;
        }

        /// <summary>  
        /// This will Authorize User  
        /// </summary>  
        /// <returns></returns>  
        public void OnAuthorization(AuthorizationFilterContext filterContext)
        {

            if (filterContext != null)
            {
                Microsoft.Extensions.Primitives.StringValues authTokens;
                filterContext.HttpContext.Request.Headers.TryGetValue("authToken", out authTokens);

                var _token = authTokens.FirstOrDefault();

                if (!string.IsNullOrEmpty(_token))
                {
                    string authToken = _token;                     
                    if (IsValidToken(authToken))
                        {
                            filterContext.HttpContext.Response.Headers.Add("authToken", authToken);
                            filterContext.HttpContext.Response.Headers.Add("AuthStatus", "Authorized");

                            filterContext.HttpContext.Response.Headers.Add("storeAccessiblity", "Authorized");

                            return;
                        }
                        else
                        {
                            filterContext.HttpContext.Response.Headers.Add("authToken", authToken);
                            filterContext.HttpContext.Response.Headers.Add("AuthStatus", "NotAuthorized");

                            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Not Authorized";
                            filterContext.Result = new JsonResult("NotAuthorized")
                            {
                                Value = new
                                {
                                    Status = "Error",
                                    Message = "Invalid Token"
                                },
                            };
                        }
                }
                else
                {
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.ExpectationFailed;
                    filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Please Provide authToken";
                    filterContext.Result = new JsonResult("Please Provide authToken")
                    {
                        Value = new
                        {
                            Status = "Error",
                            Message = "Please Provide authToken"
                        },
                    };
                }
            }
        }


        public bool IsValidToken(string authToken)
        {
            try
            {
                //validate Token here  
                //var user = _context.UserSession.Where(s => Convert.ToString(s.SessionId) == authToken).FirstOrDefault();
                return _context.UserSession.Where(s => Convert.ToString(s.SessionId) == authToken).Any();
            }
            catch (Exception e) { }
            return true;

        }
    }
}
