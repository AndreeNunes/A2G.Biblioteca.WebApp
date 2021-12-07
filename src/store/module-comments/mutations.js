import {
  GET_COMMENTS,
} from "./mutation-types";

export default {
  [GET_COMMENTS]: (state, { data }) => {
    state.comments = data;
    state.commentsFilter = data;
  },
};
