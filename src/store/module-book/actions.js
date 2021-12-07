import * as types from "./mutation-types";
import gql from "graphql-tag";

export default {
  actionGetBooks: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Books {
          books {
            _id
            code
            name
            rentedQuantity
            gender {
              _id
              name
            }
            editor {
              _id
              name
              description
            }
            author {
              _id
              name
              description
            }
            launch_year
            version
            stock
            reviewedComments {
              _id
              text
              score
              author {
                name
                email
                ra
                gender
              }
              book {
                _id
              }
              reviewed
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

      commit(types.GET_BOOK, {
        data: value?.books ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionAddBook: async ({ commit }, { apollo, book }) => {
    try {
      const GQL = gql`
        mutation CreateBook($data: BookInput) {
          createBook(data: $data) {
            code
            name
            gender {
              _id
            }
            editor {
              _id
            }
            author {
              _id
            }
            launch_year
            version
            stock
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: book,
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
        console.log("ola mutations", value.createBook);

        commit(types.ADD_BOOK, {
          data: value.createBook,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO ADICIONAR O LIVROS");
      console.log(erro);
    }
  },
  actionGetGender: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Genders {
          genders {
            _id
            name
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

      console.log("teste teste", value);

      commit(types.GET_GENDER, {
        data: value?.genders ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionAddGender: async ({ commit }, { apollo, gender }) => {
    try {
      const GQL = gql`
        mutation CreateGender($data: GenderInput) {
          createGender(data: $data) {
            name
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: gender,
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
        commit(types.ADD_GENDER, {
          data: value.createGender,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionEditGender: async ({ commit }, { apollo, gender, id }) => {
    try {
      const GQL = gql`
        mutation UpdateGender($updateGenderId: ID, $data: GenderInput) {
          updateGender(id: $updateGenderId, data: $data) {
            name
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: gender,
            updateGenderId: id,
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
        let genderData = {
          _id: id,
          name: value.updateGender.name,
        };

        commit(types.EDIT_GENDER, {
          data: genderData,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionDeleteGender: async ({ commit }, { apollo, id }) => {
    try {
      const GQL = gql`
        mutation DeleteGender($deleteGenderId: ID!) {
          deleteGender(id: $deleteGenderId)
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            deleteGenderId: id,
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
        commit(types.REMOVE_GENDER, {
          id: id,
        });
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionGetEditor: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Editors {
          editors {
            _id
            name
            description
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

      console.log("teste teste", value);

      commit(types.GET_EDITOR, {
        data: value?.editors ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS EDITORES");
      console.log(erro);
    }
  },
  actionAddEditor: async ({ commit }, { apollo, editor }) => {
    try {
      const GQL = gql`
        mutation CreateEditor($data: EditorInput) {
          createEditor(data: $data) {
            name
            description
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: editor,
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
        commit(types.ADD_EDITOR, {
          data: value.createEditor,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionEditEditor: async ({ commit }, { apollo, editor, id }) => {
    try {
      const GQL = gql`
        mutation UpdateEditor($data: EditorInput, $updateEditorId: ID) {
          updateEditor(data: $data, id: $updateEditorId) {
            name
            description
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: editor,
            updateEditorId: id,
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
        commit(types.EDIT_EDITOR, {
          data: value.updateEditor,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionDeleteEditor: async ({ commit }, { apollo, id }) => {
    try {
      const GQL = gql`
        mutation DeleteEditor($deleteEditorId: ID!) {
          deleteEditor(id: $deleteEditorId)
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            deleteEditorId: id,
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
        commit(types.REMOVE_EDITOR, {
          id: id,
        });
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR OS EDITORES");
      console.log(erro);
    }
  },
  actionGetAuthor: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Authors {
          authors {
            _id
            name
            description
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

      console.log("teste teste", value);

      commit(types.GET_AUTHOR, {
        data: value?.authors ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS EDITORES");
      console.log(erro);
    }
  },
  actionAddAuthor: async ({ commit }, { apollo, author }) => {
    try {
      const GQL = gql`
        mutation CreateAuthor($data: AuthorInput) {
          createAuthor(data: $data) {
            name
            description
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: author,
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
        commit(types.ADD_AUTHOR, {
          data: value.createAuthor,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionEditAuthor: async ({ commit }, { apollo, author, id }) => {
    try {
      const GQL = gql`
        mutation UpdateAuthor($updateAuthorId: ID, $data: AuthorInput) {
          updateAuthor(id: $updateAuthorId, data: $data) {
            name
            description
            _id
          }
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            data: author,
            updateAuthorId: id,
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
        commit(types.EDIT_AUTHOR, {
          data: value.updateAuthor,
        });

        return true;
      }
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS GENEROS");
      console.log(erro);
    }
  },
  actionDeleteAuthor: async ({ commit }, { apollo, id }) => {
    try {
      const GQL = gql`
        mutation DeleteAuthor($deleteAuthorId: ID!) {
          deleteAuthor(id: $deleteAuthorId)
        }
      `;

      let value = await apollo
        .mutate({
          mutation: GQL,
          context: {},
          variables: {
            deleteAuthorId: id,
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
        commit(types.REMOVE_AUTHOR, {
          id: id,
        });
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR OS EDITORES");
      console.log(erro);
    }
  },
  actionFilterByNameBook: async ({ commit, state }, { name }) => {
    let data = state.book.filter((element) =>
      element.name.toUpperCase().includes(name.toUpperCase())
    );

    commit(types.FILTER_BOOK_NAME, {
      data: data,
    });
  },
  actionGetBookById: async ({ commit }, { apollo, id }) => {
    try {
      const query = gql`
        query Book($bookId: ID!) {
          book(id: $bookId) {
            _id
            code
            name
            rentedQuantity
            gender {
              _id
              name
            }
            editor {
              _id
              name
              description
            }
            author {
              _id
              description
              name
            }
            launch_year
            version
            stock
            reviewedComments {
              _id
              text
              score
              author {
                name
                email
                ra
              }
              book {
                _id
              }
            }
          }
        }
      `;

      let value = await apollo
        .query({
          query: query,
          fetchPolicy: "network-only",
          variables: {
            bookId: id,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });

      console.log(id);
      console.log("LIVRO TALLLL ", value);

      return value?.book ?? false;
    } catch (erro) {
      console.log("ERRO AO BUSCA o LIVROS POR ID");
      console.log(erro);
    }
  },
  actionDeleteBook: async ({ commit }, { apollo, id }) => {
    try {
      const GQL = gql`
        mutation Mutation($deleteBookId: ID) {
          deleteBook(id: $deleteBookId)
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
        return false;
      } else {
        commit(types.REMOVE_BOOK, {
          id: id,
        });
        return true;
      }
    } catch (erro) {
      console.log("ERRO AO DELETAR OS EDITORES");
      console.log(erro);
    }
  },
};
