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
      noResults: false,
      errorMessage: "",
    };
  }
  componentDidMount() {
    let countryName = this.props.match.params.name;
    /* One of the potential weaknesses of an API is that an item might not have the identifier that the user expects. 
    For example, there is no country called russia in the data of the api. Instead, it is called "russian federation" */
    if (countryName === "russia") countryName = "russian federation";
    if (countryName === "usa") countryName = "united states";
    let countryString = "";
    if (this.state.countrycodes[countryName] !== undefined) {
      countryString = `&country=${this.state.countrycodes[countryName].code}`;
      this.setState({ countrycodeChecked: true });
    }
    fetch(
      `https://secure.geonames.org/search?q=${countryName}&maxRows=1000&style=MEDIUM${countryString}&type=json&orderby=population&lang=en&username=weknowit`
    ).then((response) =>
      response.json().then((data) => {
        console.log(data);
        let citiesFound = 0;
        for (let i = 0; i < data.geonames.length && citiesFound < 3; i++) {
          console.log(data.geonames[i].name);
          /* Check that the result is indeed a city and that it is in the country. 
          Either this is registered when the countrycode is used, or we need to double check it, in case the countrycode was not used */
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
        if (citiesFound === 0) {
          this.setState({ noResults: true });
          this.setState({ errorMessage: "No Results Found" });
        }
        this.setState({ finishedSearching: true });
      })
    );
  }
  getHeaderStyling = () => {
    return this.props.theme === "light" ? "s-h1 light-text" : "s-h1 dark-text";
  };
  getLoadingStyle() {
    if (this.state.noResults || this.state.finishedSearching) return "hidden";
    let classes = "l-bar animate ";
    classes += this.props.theme === "light" ? "light-text" : "dark-text";
    return classes;
  }
  getLoadingMvmtStyle() {
    return this.props.theme === "light" ? "anim light-mvmt" : "anim dark-mvmt";
  }
  getErrorStyling = () => {
    if (this.state.noResults)
      return this.props.theme === "light"
        ? "light-text error"
        : "dark-text error";
  };
  render() {
    return (
      <div className="s-area">
        <div className={this.getHeaderStyling()}>
          {this.props.match.params.name}
        </div>
        <div className="list-area">
          {this.state.cities.map((city, key) => (
            <City name={city.name} key={key} theme={this.props.theme} />
          ))}
          <div className={this.getLoadingStyle()}>
            <span className={this.getLoadingMvmtStyle()}></span>
            <div className="l-text">Loading...</div>
          </div>
          <div className={this.getErrorStyling()}>
            {this.state.errorMessage}
          </div>
        </div>
      </div>
    );
  }
}

export default List;
