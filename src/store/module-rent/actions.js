import * as types from "./mutation-types";
import gql from "graphql-tag";

export default {
  actionGetRented: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Query {
          rents {
            _id
            start_date
            preview_end_date
            end_date
            book {
              name
              stock
              gender {
                name
              }
            }
            user {
              name
              email
              ra
            }
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

      console.log(value);

      commit(types.GET_RENTED, {
        data: value?.rents ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS ALUGADOS");
      console.log(erro);
    }
  },
  actionAddRent: async ({ commit }, { apollo, rent}) => {
    try {
      const GQL = gql`
        mutation Mutation($data: RentInput) {
          createRent(data: $data) {
            start_date
            preview_end_date
            end_date
            book {
              name
              stock
              gender {
                name
              }
            }
            user {
              name
              email
              ra
            }
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: rent,
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
        commit(types.ADD_RENT, {
          data: value.createRent,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO ADICIONAR O LIVROS");
      console.log(erro);
    }
  },
  actionDeleteRent: async ({ commit }, { apollo, id }) => {
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
            deleteRentId: id,
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
        commit(types.REMOVE_RENT, {
          data: id,
        });
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR O RENT");
      console.log(erro);
    }
  },
};
