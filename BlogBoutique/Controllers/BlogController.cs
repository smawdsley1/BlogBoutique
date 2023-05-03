using Amazon;
using Amazon.Runtime;
using Amazon.Runtime.CredentialManagement;
using Amazon.S3;
using Amazon.S3.Model;
using BlogBoutique.Controllers;
using BlogBoutique.Helpers;
using BlogBoutique.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Globalization;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;

namespace BlogBoutique.Controllers
{
    [ApiController]
    [Route("api/blog")]
    public class BlogController : ControllerBase
    {

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

        [HttpGet("[action]/{id}")]
        public IActionResult GetItemsByUserId(Int64 id)
        {
            try
            {
                Console.WriteLine("BlogController.GetItemsByUserId() fetching user by id " + id);

                using (MyContext db = new MyContext())
                {
                    List<BlogModel> blog = db.Blog.Where(x => x.UserId == id).ToList();
                    return new ObjectResult(blog);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.GetItemsByUserId() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetBlogTypes()
        {
            try
            {
                Console.WriteLine("BlogController.GetBlogTypes() fetching blogs types.");

                using (MyContext db = new MyContext())
                {
                    List<BlogTypeModel> blogTypes = db.BlogType.ToList();
                    return new ObjectResult(blogTypes);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.GetBlogTypes() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpGet("[action]/{id}")]
        public IActionResult GetBlogImageById(Int64 id)
        {
            try
            {
                Console.WriteLine("BlogController.GetBlogImageById() fetching image by id " + id);

                using (MyContext db = new MyContext())
                {
                    PhotoModel? image = db.Photo.FirstOrDefault(x => x.BlogId == id);
                    if (image == null)
                    {
                        return new NotFoundResult();
                    }
                    return new ObjectResult(image);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.GetBlogImageById() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        //[Authorize]
        public IActionResult Post([FromBody] BlogModel blog)
        {
            try
            {
                Console.WriteLine("UsersController.Post() posting a new rental");

                using (MyContext db = new MyContext())
                {
                    if (blog?.BlogBlogTypes?.Count == 0)
                    {
                        return new StatusCodeResult(400);
                    }
                    if (String.IsNullOrWhiteSpace(blog.Title) ||
                        String.IsNullOrWhiteSpace(blog.Text))
                    {
                        Console.WriteLine("BlogController.Post() cannot post without Title or Text.");
                        return NotFound();
                    }
                    // we run this in a transaction so that if any database statement fails the whole thing faild
                    BlogModel newBlog = new BlogModel();
                    newBlog.UserId = blog.UserId;
                    newBlog.Title = blog.Title;
                    newBlog.Text = blog.Text;
                    newBlog.Upvote = 0;
                    newBlog.DateCreated = DateTime.UtcNow;
                    db.Blog.Add(newBlog);
                    db.SaveChanges();

                    foreach (BlogBlogTypeModel bbt in blog.BlogBlogTypes)
                    {
                        BlogBlogTypeModel type = new BlogBlogTypeModel();
                        type.BlogId = newBlog.BlogId;
                        type.BlogTypeId = bbt.BlogTypeId;
                        db.BlogBlogType.Add(type);
                    }
                    db.SaveChanges();

                    return new ObjectResult(newBlog);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.Post() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPut("[action]/{id}")]
        //[Authorize]
        public IActionResult UpdateBlog(int id, [FromBody] BlogModel blog)
        {
            try
            {
                Console.WriteLine("UsersController.UpdateBlog() updating a blog");

                using (MyContext db = new MyContext())
                {
                    // Get the existing blog by ID
                    BlogModel existingBlog = db.Blog.FirstOrDefault(b => b.BlogId == id);

                    if (existingBlog == null)
                    {
                        return new NotFoundResult();
                    }

                    if (existingBlog.UserId != blog.UserId)
                    {
                        return new StatusCodeResult(403);
                    }

                    // Update the properties of the existing blog
                    existingBlog.UserId = blog.UserId;
                    existingBlog.Title = blog.Title;
                    existingBlog.Text = blog.Text;
                    existingBlog.Upvote = blog.Upvote;
                    existingBlog.DateModified = DateTime.UtcNow;

                    db.SaveChanges();

                    foreach (BlogBlogTypeModel bbt in blog.BlogBlogTypes)
                    {
                        BlogBlogTypeModel type = new BlogBlogTypeModel();
                        type.BlogId = blog.BlogId;
                        type.BlogTypeId = bbt.BlogTypeId;
                        //db.BlogBlogType.Add(type);
                    }
                    //db.SaveChanges();

                    return new ObjectResult(existingBlog);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.UpdateBlog() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        //[Authorize]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            String tempFilePath = null;
            try
            {
                Console.WriteLine("BlogController.UploadFile() updating a file " + file.FileName + DateTime.UtcNow.ToString());

                if (!ImageHelper.IsImageFile(file))
                {
                    return new StatusCodeResult(400);
                }

                if (file.Length > 0)
                {
                    tempFilePath = Path.GetTempFileName();
                    using (var stream = System.IO.File.Create(tempFilePath))
                    {
                        await file.CopyToAsync(stream);
                    }
                }

                String hashName;
                using (SHA512 sha = SHA512.Create())
                {
                    byte[] buffer = UTF8Encoding.UTF8.GetBytes(DateTime.UtcNow.ToString("yyyy-MM-dd-HH-mm-ss") + "." + file.FileName);
                    buffer = sha.ComputeHash(buffer);
                    hashName = Convert.ToBase64String(buffer).Replace('/', '_').Replace("=", "").Replace("+", "").Replace("%", "");
                    hashName += Path.GetExtension(file.FileName); // keep the extension so the browser can send the mime type from the extension
                }
                Console.WriteLine("computed hash: " + hashName);

                AmazonS3Config conf = new AmazonS3Config();
                conf.RegionEndpoint = RegionEndpoint.USEast1;
                AmazonS3Client s3Client = new AmazonS3Client(Secrets.AWSKey, Secrets.AWSPass, conf);
                PutObjectRequest req = new PutObjectRequest();
                req.BucketName = "linfield.casey.2023";
                req.FilePath = tempFilePath;
                req.Key = hashName;
                req.CannedACL = S3CannedACL.PublicRead;
                req.ContentType = file.ContentType;
                await s3Client.PutObjectAsync(req);

                Console.WriteLine("upload to s3... OK");

                var imageUrl = $"https://s3.amazonaws.com/linfield.casey.2023/{hashName}";

                using (MyContext db = new MyContext())
                {
                    string blogId = Request.Form["blogId"];

                    PhotoModel image = new PhotoModel();
                    image.BlogId = int.Parse(blogId);
                    image.Url = imageUrl;
                    image.DateCreated = DateTime.UtcNow;
                    db.Photo.Add(image);
                    db.SaveChanges();
                }

                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                Console.WriteLine("BlogController.UploadFile() got error: " + ex.Message + ", Stack = " + ex.StackTrace);
                return NotFound();
            }
            finally
            {
                if (!String.IsNullOrWhiteSpace(tempFilePath))
                {
                    Console.WriteLine("deleting local file: " + tempFilePath);
                    try { System.IO.File.Delete(tempFilePath); } catch { }
                }
            }
        }
    }
}
