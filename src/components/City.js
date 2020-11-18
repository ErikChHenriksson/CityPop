import { React, Component } from "react";
import { Link } from "react-router-dom";

class City extends Component {
  getStyling = () => {
    return (this.props.theme === 'light') ? 'city light-text center' : 'city dark-text center';
  }
  render() {
    return (
      <Link to={`/city/${this.props.name}`} className={this.getStyling()}>
        {this.props.name}
      </Link>
    );
  }
}

export default City;
