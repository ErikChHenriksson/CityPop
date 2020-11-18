import { React, Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  getButtonStyling = () => {
    return (this.props.theme === 'light') ? 's-button button light-text center' : 'button dark-text s-button  center';
  }
  render() {
    return (
      <div style={styles.searchOptions}>
        <Link to="/city" className={this.getButtonStyling()}>
          search by city
        </Link>
        <Link to="/country" className={this.getButtonStyling()}>
          search by country
        </Link>
      </div>
    );
  }
}

const styles = {
  searchOptions: {
    marginTop: "5vh",
    width: "100vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  }
};

export default Landing;
