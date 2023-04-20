using System.Security.Cryptography;
using System.Text;

namespace BlogBoutique.Helpers
{
    public class StringHelper
    {
        public static String CreateSha512Hash(String value)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(value);
            using (SHA512 shaM = SHA512.Create())
            {
                byte[] data = shaM.ComputeHash(bytes);
                String hash = Encoding.UTF8.GetString(data);
                return hash;
            }
        }
    }
}