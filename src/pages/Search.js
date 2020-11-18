import { React, Component } from "react";
import search_logo from "../assets/loupe.png";
import search_logo_dark from "../assets/loupe-dark.png";
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
  getHeaderStyling = () => {
    return (this.props.theme === 'light') ? 's-h1 light-text' : 's-h1 dark-text';
  }
  getInputStyling = () => {
    return (this.props.theme === 'light') ? 's-input light-text light-input' : 's-input dark-text dark-input';
  }
  getSearchLogo() {
    return (this.props.theme === 'light') ? search_logo : search_logo_dark;
  }
  getSearchButtonStyling() {
    return (this.props.theme === 'light') ? 's-button-small center light-text' : 's-button-small center dark-text';
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
        <div className={this.getHeaderStyling()}>{"search by " + this.props.searchby}</div>
        <input
          type="text"
          className={this.getInputStyling()}
          placeholder={`Enter a ${this.props.searchby}`}
          onChange={this.updateSearchword}
          onKeyPress={this.handleEnter}
        />
        <Link
          to={`/${this.props.searchby}/${this.state.searchWord}`}
          className={this.getSearchButtonStyling()}
        >
          <img src={this.getSearchLogo()} />
        </Link>
      </div>
    );
  }
}

export default Search;
