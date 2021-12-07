import {
  GET_GENDER,
  ADD_GENDER,
  REMOVE_GENDER,
  EDIT_GENDER,
  GET_EDITOR,
  ADD_EDITOR,
  REMOVE_EDITOR,
  EDIT_EDITOR,
  GET_AUTHOR,
  ADD_AUTHOR,
  REMOVE_AUTHOR,
  EDIT_AUTHOR,
  GET_BOOK,
  ADD_BOOK,
  REMOVE_BOOK,
  EDIT_BOOK,
  FILTER_BOOK_NAME,
} from "./mutation-types";

export default {
  [GET_BOOK]: (state, { data }) => {
    state.book = data;
    state.bookFilter = data;
  },
  [ADD_BOOK]: (state, { data }) => {
    console.log("oi eu sou a mutations do dezinho", data)
    state.bookFilter.push(data);
  },
  [REMOVE_BOOK]: (state, {id}) => {
    const indice = state.book.findIndex((b) => b._id === id);
    state.book.splice(indice, 1);
  },
  [GET_GENDER]: (state, { data }) => {
    state.gender = data;
    state.genderFilter = data;
  },
  [ADD_GENDER]: (state, { data }) => {
    state.genderFilter.push(data);
  },
  [REMOVE_GENDER]: (state, { id }) => {
    const indice = state.genderFilter.findIndex((k) => k._id === id);
    state.genderFilter.splice(indice, 1);
  },
  [EDIT_GENDER]: (state, { data }) => {
    const indice = state.genderFilter.findIndex((t) => t._id === data._id);

    state.genderFilter.splice(indice, 1, data);
  },
  [GET_EDITOR]: (state, { data }) => {
    state.editor = data;
    state.editorFilter = data;
  },
  [ADD_EDITOR]: (state, { data }) => {
    state.editorFilter.push(data);
  },
  [REMOVE_EDITOR]: (state, { id }) => {
    const indice = state.editorFilter.findIndex((k) => k._id === id);
    state.editorFilter.splice(indice, 1);
  },
  [EDIT_EDITOR]: (state, { data }) => {

    console.log(data)

    const indice = state.editorFilter.findIndex((t) => t._id === data._id);

    state.editorFilter.splice(indice, 1, data);
  },
  [GET_AUTHOR]: (state, { data }) => {
    state.author = data;
    state.authorFilter = data;
  },
  [ADD_AUTHOR]: (state, { data }) => {
    state.authorFilter.push(data);
  },
  [REMOVE_AUTHOR]: (state, { id }) => {
    const indice = state.authorFilter.findIndex((k) => k._id === id);
    state.authorFilter.splice(indice, 1);
  },
  [EDIT_AUTHOR]: (state, { data }) => {
    const indice = state.authorFilter.findIndex((t) => t._id === data._id);

    state.authorFilter.splice(indice, 1, data);
  },
  [FILTER_BOOK_NAME]: (state, {data}) => {
    state.bookFilter = data 
  }
};
