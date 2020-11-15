import { React, Component } from "react";

class Population extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: "Getting information...",
      error: false,
    };
  }
  componentDidMount() {
    const cityName = this.props.match.params.name;
    fetch(
      `http://api.geonames.org/search?q=${cityName}&name_equals=${cityName}&maxRows=10&style=LONG&type=json&orderby=population&isNameRequired=true&lang=en&username=weknowit`
    ).then((response) =>
      response.json().then((data) => {
        for (let i = 0; i < data.geonames.length; i++) {
          if (data.geonames[i].fclName.includes("city")) {
            //Check that the result is indeed a city
            let pop = this.formatPopNumber(data.geonames[i].population.toString());
            this.setState({ population: pop });
            return;
          }
        }
        //If no city with name was found, display error
        this.displayError();
      })
    );
  }
  displayError() {
    this.setState({ error: true });
  }
  formatPopNumber(str) {
    let returnstack=[];
    let i = 0;
    for (i; i < str.length-3; i+=3) {
      let next3chars = (i===0) ? str.slice(-3) : str.slice(-3-i, 0-i);
      returnstack.push(next3chars);
      returnstack.push(" ");
    }
    returnstack.push(str.slice(-str.length, -i));
    let returnstring = "";
    while(returnstack.length > 0) {
      returnstring+=returnstack.pop();
    }
    return(returnstring);
  }
  getStyle() {
    if (this.state.error) return { display: "none" };
  }
  render() {
    let poparea = this.state.error ? (
      <div className="error">No results found</div>
    ) : (
      <div className="pop-area" style={this.getStyle()}>
        <div className={`pop-h1 center`}>population</div>
        <div className={`pop-number center`}>{this.state.population}</div>
      </div>
    );
    return (
      <div className="s-area">
        <div className="s-h1">{this.props.match.params.name}</div>
        {poparea}
      </div>
    );
  }
}

export default Population;
