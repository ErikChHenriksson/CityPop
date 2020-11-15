import { React, Component } from "react";

class Population extends Component {
  componentDidMount() {
    const { cityName } = this.props.match.params;
  }
  render() {
    return (
      <div className="s-area">
        <div className="s-h1">{this.props.match.params.name}</div>
        <div className="pop-area">
          <div className={`pop-h1 center`}>
            population
          </div>
          <div className={`pop-number center`}>
            12 345 678
          </div>
        </div>
      </div>
    );
  }
}

export default Population;
