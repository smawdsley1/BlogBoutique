using Amazon.S3;
using Amazon.S3.Model;
using BlogBoutique.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlogBoutique.Controllers
{
    [ApiController]
    [Route("api/blog")]
    public class BlogController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;

        public BlogController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        [HttpGet("[action]")]
        public IActionResult GetBlogs()
        {
            try
            {
                Console.WriteLine("BlogController.GetBlogs() fetching users");


                using (MyContext db = new MyContext())
                {
                    List<BlogModel> blogs = db.Blog
                        .ToList();
                    return new ObjectResult(blogs);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.GetBlogs() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return new ObjectResult(ex.Message);
            }
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetItemById(Int64 id)
        {
            try
            {
                Console.WriteLine("BlogController.GetItemById() fetching user by id " + id);

                using (MyContext db = new MyContext())
                {
                    BlogModel? blog = db.Blog.FirstOrDefault(x => x.BlogId == id);
                    if (blog == null)
                    {
                        return new NotFoundResult();
                    }
                    return new ObjectResult(blog);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.GetItemById() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        public IActionResult Post([FromBody] BlogModel blog)
        {
            try
            {
                Console.WriteLine("UsersController.Post() posting a new rental");

                using (MyContext db = new MyContext())
                {


                    // we run this in a transaction so that if any database statement fails the whole thing faild
                    BlogModel newBlog = new BlogModel();

                    newBlog.Title = blog.Title;
                    newBlog.Text = blog.Text;
                    //newBlog.Image = Upload(blog.Image);
                    newBlog.Upvote = blog.Upvote;
                    newBlog.DateCreated = DateTime.UtcNow;
                    db.Blog.Add(newBlog);
                    db.SaveChanges(); // rent.RentalId will be set after this function returns

                    return new ObjectResult(blog);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }
        /*
        [HttpPut("[action")]
        public IActionResult UpdateBlog(int id, [FromBody] BlogModel blog)
        {
            try
            {
                Console.WriteLine("UsersController.UpdateBlog() updating a blog");

                using (MyContext db = new MyContext())
                {
                    // Get the existing blog by ID
                    BlogModel existingBlog = db.Blog.FirstOrDefault(b => b.Id == id);

                    if (existingBlog == null)
                    {
                        return new NotFoundResult();
                    }

                    // Update the properties of the existing blog
                    existingBlog.Title = blog.Title;
                    existingBlog.Text = blog.Text;
                    existingBlog.Image = Upload(blog.Image);
                    existingBlog.Upvote = blog.Upvote;
                    existingBlog.DateModified = DateTime.UtcNow;

                    db.SaveChanges();

                    return new ObjectResult(existingBlog);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.UpdateBlog() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        } */

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            // Check if file is not null and is a valid image file
            try
            {
                if (file == null)
                {
                    // return error
                    return new StatusCodeResult(400);
                }
                if (!IsImageFile(file))
                {
                    return new StatusCodeResult(400);
                }
                // Generate a unique file name for the uploaded image
                var fileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{System.Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

                // Upload the file to Amazon S3
                using (var stream = file.OpenReadStream())
                {
                    var putObjectRequest = new PutObjectRequest
                    {
                        BucketName = "your-s3-bucket-name",
                        Key = fileName,
                        InputStream = stream,
                        ContentType = file.ContentType
                    };
                    await _s3Client.PutObjectAsync(putObjectRequest);
                }

                // Generate the URL to access the uploaded image
                var imageUrl = $"{_s3Client.Config.ServiceURL}/{""}/{fileName}";

                return Ok(new { ImageUrl = imageUrl });

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.Upload() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return BadRequest("Invalid image file.");
            }

        }

        private bool IsImageFile(IFormFile file)
        {
            // Validate that the uploaded file is an image file by checking the content type
            return file.ContentType.StartsWith("image/");
        }
    }
}
