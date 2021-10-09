import React from "react";
import axios from "axios";
import Button from "reactstrap/lib/Button";

export class MovieDetails extends React.Component {
  state = {
    movieDetails: null,
    isLoaded: false,
  };

  componentDidMount() {
    axios.get(`/api/movies/` + this.props.match.params.id).then((res) => {
      const movieDetail = res.data;
      this.setState({ movieDetails: movieDetail });
    });
  }
  render() {
    return (
      <>
        {this.state.movieDetails && (
          <>
            <h3>{this.state.movieDetails.title}</h3>
            <div style={{ display: "flex" }}>
              <img
                alt="poster"
                width="120"
                style={{ padding: "10px" }}
                src={this.state.movieDetails.poster}
              />{" "}
              <p>{this.state.movieDetails.plot}</p>
            </div>
            <div style={{ fontSize: "15px" }}>
              <strong>IMDB Rating: </strong>{" "}
              {this.state.movieDetails.imdbRating}
            </div>
            <div style={{ fontSize: "15px" }}>
              <strong>Location: </strong> {this.state.movieDetails.location}
            </div>
            <div style={{ fontSize: "15px" }}>
              <strong>Langauge: </strong> {this.state.movieDetails.language}
            </div>

            <div style={{ fontSize: "14px" }}>
              <strong>Stills:</strong>
            </div>
            <div style={{ display: "flex" }}>
              {this.state.movieDetails.stills.map((skill) => {
                return (
                  <img
                    alt="poster"
                    width="100"
                    height="100"
                    style={{ padding: "10px" }}
                    src={skill}
                  />
                );
              })}
            </div>
            <div style={{ fontSize: "15px", color: "darkcyan" }}>
              {this.state.movieDetails.listingType.replace("_", " ")}
            </div>
            <div style={{ fontSize: "15px", color: "darkcyan" }}>
              <Button onClick={()=>{this.props.history.goBack()}}>Back</Button>
            </div>
          </>
        )}
      </>
    );
  }
}
