using System;

namespace HR_Portalgrad.Models
{
    public class Jobs
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public string photo { get; set; }
    }
}
