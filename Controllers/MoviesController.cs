using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MovieListing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {

        private List<Item> LoadJson()
        {
            StreamReader r = new StreamReader("movies.json");
                string json = r.ReadToEnd();
                dynamic array = JsonConvert.DeserializeObject(json);
                var str = JsonConvert.SerializeObject(array["movies"]);
                List<Item> items = JsonConvert.DeserializeObject<List<Item>>(str);
            r.Close();
                return items;
        }

        public class Item
        {
            public string Language { get; set; }
            public string Location { get; set; }
            public string Plot { get; set; }
            public string Poster { get; set; }
            public string[] SoundEffects { get; set; }
            public string[] Stills { get; set; }
            public string Title { get; set; }
            public string imdbID{ get; set; }
        public string listingType { get; set; }
        public string imdbRating { get; set; }
    }

        [HttpGet("/api/movies/GetAll")]
        public ActionResult<List<Item>> GetMovieList()
        {
            var list = LoadJson();
            return Ok(list);
        }

        [HttpGet("/api/movies/{Id}")]
        public ActionResult<Item> GetMovieList(string Id)
        {
            var list = LoadJson().Where(x=>x.imdbID==Id).FirstOrDefault();
            return Ok(list);
        }
    }
}
