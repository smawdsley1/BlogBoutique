namespace BlogBoutique.Helpers
{
    public class ImageHelper
    {
        public static bool IsImageFile(IFormFile file)
        {
            // Validate that the uploaded file is an image file by checking the content type
            return file.ContentType.StartsWith("image/");
        }
    }
}
