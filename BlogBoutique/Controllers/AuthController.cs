using BlogBoutique.Controllers;
using BlogBoutique.Helpers;
using BlogBoutique.Models;
using BlogBoutique.Helpers;
using BlogBoutique.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;

namespace Blogline.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        [HttpGet]
        public string TestDB()
        {
            try
            {
                using (MyContext db = new MyContext())
                {
                    db.Database.OpenConnection();
                    db.Database.CloseConnection();

                    Console.WriteLine("Successful Database Connection.");
                    return "Connection to the Database was successful.";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("AuthController.GetUsers() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return "Connection to Database failed.";
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            try
            {
                Console.WriteLine("AuthController.GetUsers() fetching users");


                using (MyContext db = new MyContext())
                {
                    List<UserModel> users = db.User
                        .ToList();
                    return new ObjectResult(users);

                }

                //return new ObjectResult(new UserModel[] { new UserModel { FirstName = "Hello", LastName = "World", UserId = 1 } });

            }
            catch (Exception ex)
            {
                Console.WriteLine("AuthController.GetUsers() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetIp()
        {
            try
            {
                Console.WriteLine("AuthController.GetIp() fetching ip address");
                // Get the HttpContext
                var httpContext = HttpContext;

                // Retrieve the IP address from the HttpContext
                var ipAddress = httpContext.Connection.RemoteIpAddress;

                // Convert the IP address to string
                var ipAddressString = ipAddress?.ToString();

                return Ok(new { IpAddress = ipAddressString });
            }
            catch (Exception ex)
            {
                Console.WriteLine("AuthController.GetIp() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserModel value)
        {
            try
            {
                using (MyContext db = new MyContext())
                {
                    if (String.IsNullOrWhiteSpace(value.Username)
                         || String.IsNullOrWhiteSpace(value.Password))
                    {
                        Console.WriteLine("AuthController.Login() cannot login user without email address, username, or password.");
                        await Task.Delay(2000);
                        return NotFound();
                    }

                    String PasswordHash = StringHelper.CreateSha512Hash(value.Password);


                    UserModel? user = db.User.FirstOrDefault(x => x.Username == value.Username);

                    if (user == null)
                    {
                        await Task.Delay(2000);
                        return NotFound("Invalid Username or password.");
                    }

                    if (user.Password != PasswordHash)
                    {
                        await Task.Delay(2000);
                        return NotFound("Invalid Username or ");
                    }

                    // Create JWT token
                    var claims = new[]
                    {
                        new Claim("userId", user.UserId.ToString())
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secrets.JsonSecret));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
                    var token = new JwtSecurityToken(
                        issuer: "https://81in27jci3.execute-api.us-east-1.amazonaws.com/Prod/",
                        audience: "http://localhost:4200/",
                        claims: claims,
                        expires: DateTime.UtcNow.AddMinutes(60),
                        signingCredentials: creds);

                    // Return JWT token
                    return Ok(new AuthenticatedResponse { Token = new JwtSecurityTokenHandler().WriteToken(token) });
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("AuthController.Login() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        public IActionResult Post([FromBody] UserModel value)
        {
            try
            {
                Console.WriteLine("AuthController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    if (String.IsNullOrWhiteSpace(value.EmailAddress)
                         || String.IsNullOrWhiteSpace(value.FirstName)
                         || String.IsNullOrWhiteSpace(value.LastName)
                         || String.IsNullOrWhiteSpace(value.Username)
                         || String.IsNullOrWhiteSpace(value.Password))
                    {
                        return NotFound();
                    }

                    // if you need to validate email address,
                    // then invoke an email validation API like ZeroBounce

                    UserModel user = new UserModel();
                    user.EmailAddress = value.EmailAddress;
                    user.FirstName = value.FirstName;
                    user.LastName = value.LastName;
                    user.Username = value.Username;
                    user.Password = StringHelper.CreateSha512Hash(value.Password);
                    user.DateCreated = DateTime.UtcNow;

                    db.User.Add(user);
                    db.SaveChanges();

                    // Create JWT token
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secrets.JsonSecret));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
                    var token = new JwtSecurityToken(
                        issuer: "https://81in27jci3.execute-api.us-east-1.amazonaws.com/Prod/",
                        audience: "http://localhost:4200/",
                        expires: DateTime.UtcNow.AddMinutes(60),
                        signingCredentials: creds);

                    // Return JWT token
                    return Ok(new AuthenticatedResponse { Token = new JwtSecurityTokenHandler().WriteToken(token) });
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("AuthController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPut("[action]")]
        public IActionResult UpdateUser(int id, [FromBody] UserModel value)
        {
            try
            {
                Console.WriteLine("AuthController.UpdateUser() posting a new item");

                if (String.IsNullOrWhiteSpace(value.EmailAddress)
                         || String.IsNullOrWhiteSpace(value.FirstName)
                         || String.IsNullOrWhiteSpace(value.LastName)
                         || String.IsNullOrWhiteSpace(value.Username)
                         || String.IsNullOrWhiteSpace(value.Password))
                {
                    return new StatusCodeResult(400);
                }

                using (MyContext db = new MyContext())
                {
                    UserModel existingUser = db.User.FirstOrDefault(b => b.UserId == id);

                    if (existingUser == null)
                    {
                        return new NotFoundResult();
                    }

                    existingUser.EmailAddress = value.EmailAddress;
                    existingUser.FirstName = value.FirstName;
                    existingUser.LastName = value.LastName;
                    existingUser.Username = value.Username;
                    existingUser.Password = StringHelper.CreateSha512Hash(value.Password);
                    existingUser.DateCreated = DateTime.UtcNow;

                    db.User.Add(existingUser);
                    db.SaveChanges();

                    return new OkResult();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("AuthController.UpdateUser() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
    }
}
