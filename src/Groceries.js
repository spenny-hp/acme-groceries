import React from "react";
import axios from "axios";
import { update, del } from "./store";

import { connect } from "react-redux";

const _Groceries = ({ groceries, view, toggle, create }) => {
  return (
    <div>
      <button onClick={create}>CreateRandom</button>
      <ul>
        {groceries
          .filter(
            (grocery) =>
              !view ||
              (grocery.purchased && view === "purchased") ||
              (!grocery.purchased && view === "needs")
          )
          .map((grocery) => {
            return (
              <span key={`s_${grocery.id}`}>
                <button key={`b_${grocery.id}`} onClick={() => del(grocery)}>
                  X
                </button>
                <li
                  onClick={() => toggle(grocery)}
                  key={grocery.id}
                  className={grocery.purchased ? "purchased" : ""}
                >
                  {grocery.name}
                </li>
              </span>
            );
          })}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (grocery) => dispatch(update(grocery)),
    create: async () => {
      const grocery = (await axios.post("/api/groceries/random")).data;
      dispatch({ type: "CREATE", grocery });
    },
    del: (grocery) => dispatch(del(grocery)),
  };
};

const Groceries = connect((state) => state, mapDispatchToProps)(_Groceries);

export default Groceries;
