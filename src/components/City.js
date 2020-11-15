import { React, Component } from "react";
import { Link } from "react-router-dom";

class City extends Component {
  render() {
    return (
      <Link to={`/city/${this.props.name}`} className={`city button center`}>
        {this.props.name}
      </Link>
    );
  }
}

export default City;
