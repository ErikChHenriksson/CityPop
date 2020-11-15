import { React, Component } from "react";

class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: "Getting information...",
      error: false,
    };
  }
  componentDidMount() {
    const cityName = this.props.match.params.name;
    fetch(
      `http://api.geonames.org/search?q=${cityName}&name_equals=${cityName}&maxRows=10&style=LONG&type=json&orderby=population&isNameRequired=true&lang=en&username=weknowit`
    ).then((response) =>
      response.json().then((data) => {
        console.log(data.geonames);
        for (let i = 0; i < data.geonames.length; i++) {
          if (data.geonames[i].fclName.includes("city")) {
            //Check that the result is indeed a city
            this.setState({ population: data.geonames[i].population });
            console.log(`Found a city, number ${i}`);
            return;
          }
        }
        this.displayError();
      })
    );
  }
  displayError() {
    this.setState({ error: true });
  }
  getStyle() {
    if (this.state.error) return { display: "none" };
  }
  render() {
    let poparea = this.state.error ? (
      <div className="error">No results found</div>
    ) : (
      <div className="pop-area" style={this.getStyle()}>
        <div className={`pop-h1 center`}>population</div>
        <div className={`pop-number center`}>{this.state.population}</div>
      </div>
    );
    return (
      <div className="s-area">
        <div className="s-h1">{this.props.match.params.name}</div>
        {poparea}
      </div>
    );
  }
}

export default Population;
