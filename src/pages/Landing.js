import { React, Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={styles.searchOptions}>
        <Link to="/city" className={`s-button button center`}>
          search by city
        </Link>
        <Link to="/country" className={`s-button button center`}>
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
