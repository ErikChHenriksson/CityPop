import "./App.css";
import { React, Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Search from "./pages/Search.js";
import Population from "./pages/Population.js";
import List from "./pages/List.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img
              src="https://i.imgur.com/oyvK3l9.png"
              className="App-logo"
              alt="logo"
            />
          </header>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/city"
            render={(props) => <Search {...props} searchby={"city"} />}
          />
          <Route
            exact
            path="/country"
            render={(props) => <Search {...props} searchby={"country"} />}
          />
          <Route
            exact
            path="/city/:name"
            component={Population}
          />
          <Route
            exact
            path="/country/:name"
            component={List}
          />
        </div>
      </Router>
    );
  }
}

export default App;
