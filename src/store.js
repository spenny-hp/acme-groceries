import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import logger from "redux-logger";

// view
const SET_VIEW = "SET_VIEW";

// groceries
const LOAD = "LOAD";
const UPDATE = "UPDATE";
const CREATE = "CREATE";
const DELETE = "DELETE";

// reducerFunctions go here
const viewReducer = (state = "", action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
};

const groceriesReducer = (state = [], action) => {
  if (action.type === LOAD) {
    state = action.groceries;
  }
  if (action.type === UPDATE) {
    state = state.map((grocery) =>
      grocery.id === action.grocery.id ? action.grocery : grocery
    );
  }
  if (action.type === CREATE) {
    state = [...state, action.grocery];
  }
  if (action.type === DELETE) {
    state = state.filter((grocery) => grocery.id !== action.grocery.id);
  }
  return state;
};

const reducer = combineReducers({
  groceries: groceriesReducer,
  view: viewReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

const setView = (view) => {
  return {
    type: SET_VIEW,
    view,
  };
};

const loadGroceries = (groceries) => {
  return {
    type: LOAD,
    groceries,
  };
};

const load = () => {
  return async (dispatch) => {
    const groceries = (await axios.get("/api/groceries")).data;
    dispatch(loadGroceries(groceries));
  };
};

const createGrocery = (grocery) => {
  return { type: CREATE, grocery };
};

const create = (name) => {
  return async (dispatch) => {
    const grocery = (await axios.post("/api/groceries", { name })).data;
    dispatch(createGrocery(grocery));
  };
};

const updateGrocery = (grocery) => {
  return { type: UPDATE, grocery };
};

const update = (grocery) => {
  return async (dispatch) => {
    const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
      dispatch(updateGrocery(updated));
  }
}

const deleteGrocery = (grocery) => {
  return {
    type: DELETE,
    grocery
  }
}

const del = (grocery) => {
  return async (dispatch) => {
    const deleted = (await axios.delete(`/api/groceries/${grocery.id}`)).data;
    dispatch(deleteGrocery(deleted));
  }
};

export { setView, load, loadGroceries, create, createGrocery, update, updateGrocery, del };

export default store;
