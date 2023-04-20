using BlogBoutique.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogBoutique.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController: ControllerBase
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

                    Console.WriteLine("sucess");
                    return "connection was successful";
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine("error: " + ex.Message);
                return "db failed";
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            try
            {
                using (MyContext db = new MyContext())
                {
                    List<UserModel> equipments = db.User.ToList();
                    return new ObjectResult(equipments);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("error: " + ex.Message);
                return new ObjectResult(ex.Message);
            }
        }


    }
}
