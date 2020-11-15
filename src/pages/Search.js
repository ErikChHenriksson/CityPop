import { React, Component } from "react";
import search_logo from "../assets/loupe.png";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
    };
    this.updateSearchword = this.updateSearchword.bind(this);
  }

  updateSearchword(event) {
    this.setState({ searchWord: event.target.value });
  }

  render() {
    return (
      <div className="s-area">
        <div className="s-h1">{"search by " + this.props.searchby}</div>
        <input
          type="text"
          className="s-input"
          placeholder={`Enter a ${this.props.searchby}`}
          onChange={this.updateSearchword}
        />
        <Link to={`/${this.props.searchby}/${this.state.searchWord}`} className={`s-button-small button center`}>
          <img src={search_logo} />
        </Link>
      </div>
    );
  }
}

export default Search;
