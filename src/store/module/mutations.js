import {
  GET_USERS, FILTER_USERS, GET_BOOKS, EDIT_USER, ADD_USER, REMOVE_USER
} from "./mutation-types";

export default {
  [GET_USERS]: (state, { data }) => {
    state.users = data;
    state.usersFilter = data;
  },
  [FILTER_USERS]: (state, { data }) => {
    state.usersFilter = data;
  },
  [GET_BOOKS]: (state, { data }) => {
    state.books = data;
    state.booksFilter = data;
  },
  [EDIT_USER]: (state, { data }) => {
    const indice = state.usersFilter.findIndex(
      (t) => t._id === data._id
    );

    state.usersFilter.splice(indice, 1, data);
  },
  [ADD_USER]: (state, { data }) => {
    state.usersFilter.push(data);
  },
  [REMOVE_USER]: (state, { id }) => {
    const indice = state.usersFilter.findIndex(t => t._id === id)
    state.usersFilter.splice(indice, 1)
  }
};
