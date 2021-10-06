import React from 'react'



class MovieRow extends React.Component {
  constructor(props) {
    super(props);
}

  viewMovie=() => {
    this.props.history.push('/details/'+this.props.movie.imdbID);
  } 

  render() {
    return <table key={this.props.movie.Title}>
    <tbody>
      <tr>
        <td>
          <img alt="poster" width="120" src={this.props.movie.Poster}/>
        </td>
        <td style={{height:"100%"}}>
          <h3>{this.props.movie.Title}</h3>
          <p>{this.props.movie.Plot}</p>
          {/* <input type="button" onClick={this.viewMovie.bind(this)} value="View"/> */}
          <button type="button" onClick={()=>this.viewMovie()}  class="btn btn-light">Details</button>
        </td>
      </tr>
    </tbody>
  </table>
  }
}

export default MovieRow