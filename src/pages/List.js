import { React, Component } from "react";
import City from "../components/City.js";

class List extends Component {
  state = {
    cities: [
      {
        name: "Paris",
      },
      {
        name: "London",
      },
      {
        name: "Stockholm",
      },
    ],
  };
  componentDidMount() {
    const { countryName } = this.props.match.params.name;
  }
  render() {
    return (
      <div className="s-area">
        <div className="s-h1">{this.props.match.params.name}</div>
        <div className="list-area">
          {this.state.cities.map((city) => (
            <City name={city.name} />
          ))}
        </div>
      </div>
    );
  }
}

export default List;
