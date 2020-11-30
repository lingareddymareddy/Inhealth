namespace BlogAPI
{
    public class UserRequest
    {
        public int Id { get; set; }
        public bool? IsAdmin { get; set; }
        public bool? IsDeleted { get; set; }
        public int UpdatedBy { get; set; }
        public bool? IsActive { get; set; } = true;
       // public DateTime? UpdatedOn { get; set; } = DateTime.Now;
    }
}
