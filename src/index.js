import React, { Component } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import store, { load, loadGroceries, setView } from "./store";
import Nav from "./Nav";
import Groceries from "./Groceries";
import CreateForm from "./CreateForm";
import axios from "axios";

class _App extends Component {
  componentDidMount() {
    this.props.bootstrap();
    window.addEventListener("hashchange", () => {
      this.props.setView(window.location.hash.slice(1));
    });
    this.props.setView(window.location.hash.slice(1));
  }
  render() {
    const { groceries, view } = this.props;
    return (
      <div>
        <h1>Acme Groceries</h1>
        <Nav />
        <CreateForm />
        <Groceries />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    setView: (view)=> dispatch(setView(view)),
    bootstrap: ()=> {
      dispatch(load());
    }
  };
};

const App = connect(null, mapDispatchToProps)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
); 
