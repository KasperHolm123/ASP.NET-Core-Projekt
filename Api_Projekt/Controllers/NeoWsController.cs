using Api_Projekt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.Json;
using System.Web;

namespace Api_Projekt.Controllers
{
    public class NeoWsController : Controller
    {
        private readonly ApplicationDbContext _db;
        [BindProperty]
        public Asteroid Asteroid { get; set; }

        public NeoWsController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ApiView()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ApiView(int? id)
        {
            //if (ModelState.IsValid)
            //{
            //    _ = model.ID == 0 ? _db.Asteroids.Add(model) : _db.Asteroids.Update(model);
            //    _db.SaveChanges();
            //    return RedirectToAction("Index");
            //}
            return View();
        }

        public IActionResult Upsert()
        {
            return View(new Asteroid());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert(Asteroid model)
        {
            string name = model.Name;
            Console.WriteLine(name);
            //if (ModelState.IsValid)
            //{
            //    _ = model.ID == 0 ? _db.Asteroids.Add(model) : _db.Asteroids.Update(model);
            //    _db.SaveChanges();
            //    return RedirectToAction("Index");
            //}
            return View(Asteroid);
        }

        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = _db.Asteroids.ToListAsync() });
        }

        /// <summary>
        /// Makes a call to the Nasa NeoWs API
        /// </summary>
        /// <returns>JSON with all Neo's within the specified time frame.</returns>
        public async Task<IActionResult> NasaGetAll() //string START_DATE, string END_DATE, string API_KEY
        {
            var START_DATE = "2015-09-07";
            var END_DATE = "2015-09-08";
            var API_KEY = "gNuLkRkZgZS1zdx0AQr8CUVvqQxfXWTTCSVTeDXx";
            using (var client = new HttpClient())
            {
                var apiLink = $"https://api.nasa.gov/neo/rest/v1/feed?start_date={START_DATE}&end_date={END_DATE}&api_key={API_KEY}";
                var response = await client.GetAsync(apiLink);
                var responseToString = response.Content.ReadAsStringAsync().Result;
                var json_object = JsonConvert.DeserializeObject<Root>(responseToString);

                // JS needs the retrieved json to be wrapped in an array [] for some reason..
                object[] wrappedJson = new object[] { json_object };
                return Json(new { data = wrappedJson });
            }
        }
    }
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class noget
    {
        public Links links { get; set; }
    public string id { get; set; }
    public string neo_reference_id { get; set; }
    public string name { get; set; }
    public string nasa_jpl_url { get; set; }
    public double absolute_magnitude_h { get; set; }
    public EstimatedDiameter estimated_diameter { get; set; }
    public bool is_potentially_hazardous_asteroid { get; set; }
    public List<CloseApproachDatum> close_approach_data { get; set; }
    public bool is_sentry_object { get; set; }
    }

    public class noget1
    {
        public Links links { get; set; }
        public string id { get; set; }
        public string neo_reference_id { get; set; }
        public string name { get; set; }
        public string nasa_jpl_url { get; set; }
        public double absolute_magnitude_h { get; set; }
        public EstimatedDiameter estimated_diameter { get; set; }
        public bool is_potentially_hazardous_asteroid { get; set; }
        public List<CloseApproachDatum> close_approach_data { get; set; }
        public bool is_sentry_object { get; set; }
    }

    public class CloseApproachDatum
    {
        public string close_approach_date { get; set; }
        public string close_approach_date_full { get; set; }
        public object epoch_date_close_approach { get; set; }
        public RelativeVelocity relative_velocity { get; set; }
        public MissDistance miss_distance { get; set; }
        public string orbiting_body { get; set; }
    }

    public class EstimatedDiameter
    {
        public Kilometers kilometers { get; set; }
        public Meters meters { get; set; }
        public Miles miles { get; set; }
        public Feet feet { get; set; }
    }

    public class Feet
    {
        public double estimated_diameter_min { get; set; }
        public double estimated_diameter_max { get; set; }
    }

    public class Kilometers
    {
        public double estimated_diameter_min { get; set; }
        public double estimated_diameter_max { get; set; }
    }

    public class Links
    {
        public string next { get; set; }
        public string previous { get; set; }
        public string self { get; set; }
    }

    public class Meters
    {
        public double estimated_diameter_min { get; set; }
        public double estimated_diameter_max { get; set; }
    }

    public class Miles
    {
        public double estimated_diameter_min { get; set; }
        public double estimated_diameter_max { get; set; }
    }

    public class MissDistance
    {
        public string astronomical { get; set; }
        public string lunar { get; set; }
        public string kilometers { get; set; }
        public string miles { get; set; }
    }

    public class NearEarthObjects
    {
        [JsonProperty("2015-09-08")]
        public List<noget1> _0 { get; set; }

        [JsonProperty("2015-09-07")]
        public List<noget> _1 { get; set; }
    }

    public class RelativeVelocity
    {
        public string kilometers_per_second { get; set; }
        public string kilometers_per_hour { get; set; }
        public string miles_per_hour { get; set; }
    }

    public class Root
    {
        public Links links { get; set; }
        public int element_count { get; set; }
        public NearEarthObjects near_earth_objects { get; set; }
    }


}
