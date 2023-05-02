using BlogBoutique.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogBoutique.Controllers
{
    [ApiController]
    [Route("api/route")]
    public class CommentController : Controller
    {
        [HttpGet]
        public IActionResult GetCommentsById(Int64 id)
        {
            try
            {
                Console.WriteLine("CommentController.GetCommentsById() fetching user by id " + id);

                using (MyContext db = new MyContext())
                {
                    List<CommentModel> comments = db.Comment.Where(x => x.BlogId == id).ToList();
                    if (comments == null)
                    {
                        return new NotFoundResult();
                    }
                    return new ObjectResult(comments);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("CommentController.GetCommentsById() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        //[Authorize]
        public IActionResult Post([FromBody] CommentModel value)
        {
            try
            {
                Console.WriteLine("CommentController.Post() posting a new item");

                using (MyContext db = new MyContext())
                {
                    if (value.Text == null)
                    {
                        return new StatusCodeResult(400);
                    }

                    CommentModel comment = new CommentModel();
                    comment.BlogId = value.BlogId;
                    comment.UserId = value.UserId;
                    comment.Text = value.Text;
                    comment.DateCreated = DateTime.UtcNow;

                    db.Comment.Add(comment);
                    db.SaveChanges();

                    return new OkResult();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("CommentController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
    }
}
