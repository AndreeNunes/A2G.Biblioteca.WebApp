import {
  GET_RENTED,
  ADD_RENT,
  REMOVE_RENT,
} from "./mutation-types";
export default {
  [GET_RENTED]: (state, { data }) => {
    state.rented = data;
    state.rentedFilter = data;
  },
  [ADD_RENT]: (state, { data }) => {
    state.rentedFilter.push(data)
  },
  [REMOVE_RENT]: (state, { id }) => {
    const indice = state.rented.findIndex((b) => b._id === id);
    state.rented.splice(indice, 1);
  }
};
