using System.ComponentModel.DataAnnotations;

namespace CountryDemo.Server.Entities
{
    public class State
    {
        public int StateId { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }

        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
