using System.ComponentModel.DataAnnotations;

namespace Api_Projekt.Models
{
    public class Asteroid
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public bool IsPotentiallyHazardousAsteroid { get; set; }
        public string CloseApproachDate { get; set; }

        public Asteroid()
        {

        }

        public Asteroid(string name, bool hazardous, string date)
        {
            Name = name;
            IsPotentiallyHazardousAsteroid = hazardous;
            CloseApproachDate = date;
        }
    }
}
