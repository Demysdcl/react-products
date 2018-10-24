import React, { Component } from "react";
import { RequestService } from "./RequestService";

class Categoria extends Component {
  service = new RequestService("produtos");

  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    };
  }
  componentDidMount() {
    const id = this.props.match.params.catId;
    this.loadData(id);
  }

  componentWillReceiveProps(newProps) {
    this.loadData(newProps.match.params.catId);
  }

  loadData = async id => {
    try {
      const prods = await this.service.get(`categoria=${id}`);
      this.setState({ produtos: prods.data });
    } catch (error) {
      console.log(error);
    }
  };

  renderProduto = prod => {
    return (
      <p key={prod.id} className="alert alert-primary">
        {prod.produto}
      </p>
    );
  };

  render() {
    return (
      <div>
        <h1> {this.props.match.params.catName} </h1>
        {this.state.produtos.map(this.renderProduto)}
      </div>
    );
  }
}

export default Categoria;
