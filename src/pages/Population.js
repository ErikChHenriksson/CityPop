import { React, Component } from "react";

class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: 0,
      countTo: 100000000,
      foundPop: false,
      error: false,
      counter: () => {},
    };
  }
  componentDidMount() {
    const cityName = this.props.match.params.name;

    this.setState({
      counter: setInterval(() => {
        if (this.state.population >= this.state.countTo || this.state.error)
          clearInterval(this.state.counter);
        this.setState({ population: this.state.population + 15 });
      }, 0),
    });
    fetch(
      `https://secure.geonames.org/search?q=${cityName}&name_equals=${cityName}&maxRows=10&style=LONG&type=json&orderby=population&isNameRequired=true&lang=en&username=weknowit`
    ).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        this.finishWithError();
        return;
      }
      response.json().then((data) => {
        console.log(data);
        if(!data.geonames) {
          this.finishWithError();
          return;
        }
        for (let i = 0; i < data.geonames.length; i++) {
          if (data.geonames[i].fclName.includes("city")) {
            //Check that the result is indeed a city
            let pop = this.formatPopNumber(
              data.geonames[i].population.toString()
            );
            console.log("Pop found!. Result " + i + " with pop " + pop);
            this.setState({ foundPop: true });
            this.setState({ population: pop });
            clearInterval(this.state.counter);
            break;
          }
        }
        //If no city with name was found, display error
        if (!this.state.foundPop) this.finishWithError();
      });
    });
  }
  finishWithError() {
    clearInterval(this.state.counter);
    this.setState({ error: true });
  }
  formatPopNumber(str) {
    let returnstack = [];
    let i = 0;
    for (i; i < str.length - 3; i += 3) {
      let next3chars = i === 0 ? str.slice(-3) : str.slice(-3 - i, 0 - i);
      returnstack.push(next3chars);
      returnstack.push(" ");
    }
    let remaining = i === 0 ? str : str.slice(-str.length, -i);
    returnstack.push(remaining);
    let returnstring = "";
    while (returnstack.length > 0) {
      returnstring += returnstack.pop();
    }
    return returnstring;
  }
  getStyle() {
    if (this.state.error) return { display: "none" };
  }
  getHeaderStyling = () => {
    return (this.props.theme === 'light') ? 's-h1 light-text' : 's-h1 dark-text';
  }
  getPopAreaStyle() {
    return (this.props.theme === 'light') ? 'pop-area light-text' : 'pop-area dark-text';
  }
  render() {
    let poparea = this.state.error ? (
      <div className="error">No results found</div>
    ) : (
      <div className={this.getPopAreaStyle()} style={this.getStyle()}>
        <div className={`pop-h1 center`}>population</div>
        <div className={`pop-number center`}>{this.state.population}</div>
      </div>
    );
    return (
      <div className="s-area">
        <div className={this.getHeaderStyling()}>{this.props.match.params.name}</div>
        {poparea}
      </div>
    );
  }
}

export default Population;
