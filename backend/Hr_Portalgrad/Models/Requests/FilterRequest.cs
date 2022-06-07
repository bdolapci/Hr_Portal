using Microsoft.AspNetCore.Mvc;

namespace HR_Portalgrad.Models.Requests
{
    public class FilterRequest 
    {

        public string companyName { get; set; }
        public string isRemote { get; set; }
        public string experience { get; set; }
        public string SystemDate { get; set; }
        public string jobType { get; set; }
    }
}
