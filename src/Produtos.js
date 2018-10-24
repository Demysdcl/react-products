import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import ProdutoHome from "./ProdutoHome";
import Categoria from "./Categoria";
import { RequestService } from "./RequestService";

class Produtos extends Component {
  service = new RequestService("categorias");

  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
  }

  loadData = async () => {
    try {
      const categorias = await this.service.get("categorias");
      this.setState({
        categorias: categorias.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.loadData();
  }

  removeCat = cat => {
    this.service.delete(cat.id).then(resp => this.loadData());
  };

  renderCategoria = cat => {
    return (
      <li className="list" key={cat.id}>
        <button 
          className="btn btn-sm mr-2 mb-2"
          onClick={() => this.removeCat(cat)}
        >
          <span>X</span>
        </button>
        <Link to={`/produtos/categoria/${cat.id}/${cat.categoria}`}>
          {cat.categoria}
        </Link>
      </li>
    );
  };

  handleNewCat = key => {
    if (key.keyCode === 13) {
      const newCategoria = { categoria: this.refs.categoria.value };
      this.service.post(newCategoria).then(resp =>
        this.loadData()
      );
      this.refs.categoria.value = "";
    }
  };

  render() {
    const { url } = this.props.match;
    const { categorias } = this.state;
    return (
      <div className="row">
        <div className="col-md-3">
          <h3> Categorias </h3>
          <ul> {categorias.map(this.renderCategoria)} </ul>
          <div className="alert alert-primary">
            <input
              onKeyUp={this.handleNewCat}
              type="text"
              ref="categoria"
              placeholder="Nova categoria"
            />
          </div>
        </div>
        <div className="col-md-9">
          <Route exact path={url} component={ProdutoHome} />
          <Route
            exact
            path={url + "/categoria/:catId/:catName"}
            component={Categoria}
          />
        </div>
      </div>
    );
  }
}

export default Produtos;
