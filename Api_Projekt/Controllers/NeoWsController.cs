using Api_Projekt.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

        public IActionResult ApiView(string? startDate, string? endDate)
        {
            //if (ModelState.IsValid)
            //{
            //    _ = Asteroid.ID == 0 ? _db.Asteroids.Add(Asteroid) : _db.Asteroids.Update(Asteroid);
            //    _db.SaveChanges();
            //    return RedirectToAction("Index");
            //}

            //return View(Asteroid);
            return View();
        }

        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = await _db.Asteroids.ToListAsync() });
        }

        /// <summary>
        /// Makes a call to the Nasa NeoWs API
        /// </summary>
        /// <returns>JSON with all Neo's within the specified time frame.</returns>
        [Produces("application/json")]
        public async Task<IActionResult> NasaGetAll() //string START_DATE, string END_DATE, string API_KEY
        {
            var START_DATE = "2015-09-07";
            var END_DATE = "2015-09-08";
            var API_KEY = "DEMO_KEY";
            using (var client = new HttpClient())
            {
                var apiLink = $"https://api.nasa.gov/neo/rest/v1/feed?start_date={START_DATE}&end_date={END_DATE}&api_key={API_KEY}";
                var json = await client.GetAsync(apiLink);
                var response = json.Content.ReadAsStringAsync().Result;

                return Json(new { data = response });
            }
        }
    }
}
