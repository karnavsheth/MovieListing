import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Search } from "./components/SearchPage";
import { MovieDetails } from "./components/MovieDetails";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <Route exact path="/" component={Search} />
          <Route
            path="/details/:id"
            render={(props) => <MovieDetails {...props}></MovieDetails>}
          ></Route>
        </Layout>
      </>
    );
  }
}

export default App;
