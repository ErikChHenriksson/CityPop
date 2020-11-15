import { React, Component } from "react";
import search_logo from "../assets/loupe.png";
import { Link, Redirect } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      redirect: false,
    };
    this.updateSearchword = this.updateSearchword.bind(this);
  }

  handleEnter = (e) => {
    console.log(e.charCode);
    if (e.charCode === 13) this.setState({ redirect: true });
  };

  updateSearchword(event) {
    this.setState({ searchWord: event.target.value.toLowerCase() });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={`/${this.props.searchby}/${this.state.searchWord}`}
        />
      );
    }
    return (
      <div className="s-area">
        <div className="s-h1">{"search by " + this.props.searchby}</div>
        <input
          type="text"
          className="s-input"
          placeholder={`Enter a ${this.props.searchby}`}
          onChange={this.updateSearchword}
          onKeyPress={this.handleEnter}
        />
        <Link
          to={`/${this.props.searchby}/${this.state.searchWord}`}
          className={`s-button-small button center`}
        >
          <img src={search_logo} />
        </Link>
      </div>
    );
  }
}

export default Search;
