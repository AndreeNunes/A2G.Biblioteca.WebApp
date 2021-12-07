import * as types from "./mutation-types";
import gql from "graphql-tag";

export default {
  actionGetComments: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Query {
          comments {
            _id
            text
            score
            book {
              _id
              name
              gender {
                _id
                name
              }
              author {
                name
              }
            }
            author {
              idAuthor: _id
              name
              email
              ra
            }
            reviewed
          }
        }
      `;

      let value = await apollo
        .query({
          query: query,
          fetchPolicy: "network-only", // skip the cache
          context: {},
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });

      console.log("COMMENTARIOS LEGAIS ", value.comments);

      commit(types.GET_COMMENTS, {
        data: value?.comments ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS ComentárioS");
      console.log(erro);
    }
  },
  actionAddComment: async ({ commit }, { apollo, comment }) => {
    try {
      const GQL = gql`
        mutation CreateComment($data: CommentInput) {
          createComment(data: $data) {
            _id
            text
            score
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: comment,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("teste teste", err);
          return null;
        });

      if (value == null) {
        return false;
      } else {
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR O Comentário");
      console.log(erro);
    }
  },
  actionEditComment: async ({ commit }, { apollo, id, comment }) => {

    try {
      const GQL = gql`
        mutation UpdateComment($updateCommentId: ID, $data: CommentInput) {
          updateComment(id: $updateCommentId, data: $data) {
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            updateCommentId: id,
            data: comment,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("teste teste", err);
          return null;
        });

      if (value == null) {
        return false;
      } else {
        return value.updateComment;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR O Comentário");
      console.log(erro);
    }
  },
  actionDeleteComment: async ({ commit }, { apollo, id }) => {
    try {
      const GQL = gql`
        mutation DeleteComment($deleteCommentId: ID) {
          deleteComment(id: $deleteCommentId)
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            deleteBookId: id,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log("teste teste", err);
          return null;
        });

      if (value == null) {
        


      } else {
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR O Comentário");
      console.log(erro);
    }
  },
};
