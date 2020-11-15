import { React, Component } from "react";
import City from "../components/City.js";

class List extends Component {
  constructor(props) {
    super(props);
    let countrycodes = require("../assets/countrycodes.json");
    this.state = {
      cities: [],
      countrycodes: countrycodes,
      countrycodeChecked: false,
    };
  }
  componentDidMount() {
    const countryName = this.props.match.params.name;
    let countryString = "";
    if (this.state.countrycodes[countryName] !== undefined) {
      countryString = `&country=${this.state.countrycodes[countryName].code}`;
      this.setState({ countrycodeChecked: true });
    }
    fetch(
      `http://api.geonames.org/search?q=${countryName}&maxRows=1000&style=MEDIUM${countryString}&type=json&orderby=population&lang=en&username=weknowit`
    ).then((response) =>
      response.json().then((data) => {
        console.log(data);
        let citiesFound = 0;
        for (let i = 0; i < data.geonames.length && citiesFound < 3; i++) {
          //Check that the result is indeed a city and that it is in the country. Either this is registered when the countrycode is used, or we need to double check it, in case the countrycode was not used
          if (
            data.geonames[i].fclName.includes("city") &&
            (this.state.countrycodeChecked ||
              data.geonames[i].countryName === countryName)
          ) {
            this.setState((prevState) => ({
              cities: [...prevState.cities, { name: data.geonames[i].name }],
            }));
            citiesFound++;
          }
        }
      })
    );
  }
  render() {
    return (
      <div className="s-area">
        <div className="s-h1">{this.props.match.params.name}</div>
        <div className="list-area">
          {this.state.cities.map((city, key) => (
            <City name={city.name} key={key} />
          ))}
        </div>
      </div>
    );
  }
}

export default List;
