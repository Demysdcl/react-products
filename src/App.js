import React, { Component } from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sobre from "./Sobre";
import Produtos from "./Produtos";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                  Gerenciador de Produtos
                </Link>
              </div>
              <ul className="nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/produtos">
                    Produtos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sobre">
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/sobre" component={Sobre} />
            <Route path="/produtos" component={Produtos} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
