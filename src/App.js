import "./App.css";
import { React, Component } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Landing from "./pages/Landing.js";
import Search from "./pages/Search.js";
import Population from "./pages/Population.js";
import List from "./pages/List.js";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import citypop_logo from "./assets/citypop_logo.png";
import citypop_logo_dark from "./assets/citypop_logo_dark.png";
import day from "./assets/sun.png";
import night from "./assets/night-mode.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }
  goHome() {
    window.location.href = "/";
  }
  themeToggler = () => {
    this.state.theme === "light"
      ? this.setState({ theme: "dark" })
      : this.setState({ theme: "light" });
  };
  render() {
    return (
      <ThemeProvider
        theme={this.state.theme === "light" ? lightTheme : darkTheme}
      >
        <>
          <GlobalStyles />
          <Router>
            <div className="App">
              <header className="App-header">
                <div className="clickable" onClick={this.goHome}>
                  <img
                    src={
                      this.state.theme === "light"
                        ? citypop_logo
                        : citypop_logo_dark
                    }
                    className="App-logo"
                    alt="logo"
                  />
                </div>
                <div onClick={this.themeToggler} className="darkmode-button clickable">
                  <img src={this.state.theme === "light" ? day : night} className="darkmode-img"></img>
                  Switch Theme
                </div>
              </header>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Landing {...props} theme={this.state.theme} />
                )}
              />
              <Route
                exact
                path="/city"
                render={(props) => (
                  <Search
                    {...props}
                    searchby={"city"}
                    theme={this.state.theme}
                  />
                )}
              />
              <Route
                exact
                path="/country"
                render={(props) => (
                  <Search
                    {...props}
                    searchby={"country"}
                    theme={this.state.theme}
                  />
                )}
              />
              <Route
                exact
                path="/city/:name"
                render={(props) => (
                  <Population {...props} theme={this.state.theme} />
                )}
              />
              <Route
                exact
                path="/country/:name"
                render={(props) => <List {...props} theme={this.state.theme} />}
              />
            </div>
          </Router>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
