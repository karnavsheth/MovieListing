import React, { Component } from "react";
import axios from "axios";
import MovieRow from "./MovieRow";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      allData: [],
      locationList: [],
      selectedLocation: null,
      languageList: [],
      selectedLang: null,
      searchTerm: null,
    };

    this.performSearch();
  }

  performSearch(searchTerm) {
    if (this.state.allData.length <= 0) {
      axios.get(`/api/movies/GetAll`).then((res) => {
        const apiData = res.data;

        const locationList = apiData
          .map((data) => data.location)
          .filter(function (x, i, a) {
            return a.indexOf(x) === i;
          });

        const languageList = apiData
          .map((data) => data.language)
          .filter(function (x, i, a) {
            return a.indexOf(x) === i;
          });
        this.setState(
          {
            filteredData: apiData,
            allData: apiData,
            locationList: locationList,
            languageList: languageList,
          },
          () => {
            var movieRows = [];
            this.state.filteredData.forEach((movie) => {
              const movieRow = (
                <MovieRow key={movie.Title} movie={movie} {...this.props} />
              );
              movieRows.push(movieRow);
            });
            this.setState({ rows: movieRows });
          }
        );
      });
    } else {
      let result = [];
      if (searchTerm !== null) {
        result = this.state.allData.filter((d) => {
          return d.title.toLowerCase().search(searchTerm) != -1;
        });
      } else {
        result = this.state.allData;
      }
      if (this.state.selectedLang !== null && this.state.selectedLang !== "0") {
        result = result.filter((d) => {
          return d.language.search(this.state.selectedLang) != -1;
        });
      }

      if (
        this.state.selectedLocation !== null &&
        this.state.selectedLocation !== "0"
      ) {
        result = result.filter((d) => {
          return d.location.search(this.state.selectedLocation) != -1;
        });
      }
      this.setState(
        {
          filteredData: result,
        },
        () => {
          var movieRows = [];
          this.state.filteredData.forEach((movie) => {
            const movieRow = (
              <MovieRow key={movie.Title} movie={movie} {...this.props} />
            );
            movieRows.push(movieRow);
          });
          this.setState({ rows: movieRows });
        }
      );
    }
  }

  searchChangeHandler(event) {
    let value = event.target.value.toLowerCase();
    this.setState({ searchTerm: value });
    this.performSearch(value);
  }

  handleLangChange(event) {
    let value = event.target.value;
    this.setState({ selectedLang: value }, () => {
      this.performSearch();
    });
  }

  handleLocationChange(event) {
    console.log(event.target);
    let value = event.target.value;
    this.setState({ selectedLocation: value }, () => {
      this.performSearch();
    });
  }

  render() {
    return (
      <>
        <div>
          <div className="container-md">
            <br />
            <input
              style={{
                fontSize: 16,
                display: "block",
                width: "100%",
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
              }}
              className="form-control"
              onChange={this.searchChangeHandler.bind(this)}
              placeholder="Enter search term"
            />
            <br />
            <div style={{ display: "flex" }}>
              <select
                className="form-control"
                name="location"
                value={this.state.selectedLocation}
                id="location"
                style={{ margin: "0 10px" }}
                onChange={this.handleLocationChange.bind(this)}
              >
                <option value={0}>Select Location</option>
                {this.state.locationList.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
              <select
                className="form-control"
                name="lang"
                id="lang"
                value={this.state.selectedLang}
                style={{ margin: "0 10px" }}
                onChange={this.handleLangChange.bind(this)}
              >
                <option value={0}>Select Langauge</option>
                {this.state.languageList.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
            <br />
            {this.state.rows}
          </div>
        </div>
      </>
    );
  }
}
