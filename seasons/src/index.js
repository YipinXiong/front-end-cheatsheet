import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lat: null , errorMessage: ''};
  }

  // to make your code more maintainable; it is always good to centralize fetching data operations
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        // we called setstate!!!
        this.setState({ lat: position.coords.latitude });

        // we did not!!!
        // this.state.lat = position.coords.latitude
      },
      err => this.setState({ errorMessage: err.message})
    );
  }

  //React requires us to define render; it will be called frequently
  render() {
    if(this.state.errorMessage && !this.state.lat){
      return <div>Error: {this.state.errorMessage}</div>
    }

    if(!this.state.errorMessage&& this.state.lat){
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <div> Loading!</div>;
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);