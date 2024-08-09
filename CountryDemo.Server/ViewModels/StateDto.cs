namespace CountryDemo.Server.ViewModels
{
    public class StateDto
    {
        public int StateId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int CountryId { get; set; }
        public string? CountryName { get; set; } // Additional property to hold the country name
    }
}
