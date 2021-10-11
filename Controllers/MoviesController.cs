using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieListing.Classes;
using Newtonsoft.Json;

namespace MovieListing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {

        private List<Movie> LoadJson()
        {
            StreamReader r = new StreamReader("movies.json");
                string json = r.ReadToEnd();
                dynamic array = JsonConvert.DeserializeObject(json);
                var str = JsonConvert.SerializeObject(array["movies"]);
                List<Movie> items = JsonConvert.DeserializeObject<List<Movie>>(str);
            r.Close();
                return items;
        }


        [HttpGet("/api/movies/GetAll")]
        public ActionResult<List<Movie>> GetMovieList()
        {
            var movieList = LoadJson();
            return Ok(movieList);
        }

        [HttpGet("/api/movies/{Id}")]
        public ActionResult<Movie> GetMovieList(string Id)
        {
            var movieDetails = LoadJson().Where(x=>x.imdbID==Id).FirstOrDefault();
            return Ok(movieDetails);
        }
    }
}
