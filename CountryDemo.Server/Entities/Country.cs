using System.ComponentModel.DataAnnotations;

namespace CountryDemo.Server.Entities
{
    public class Country
    {
        public int CountryId { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }

        public ICollection<State> States { get; set; }
    }
}
