import * as types from "./mutation-types";
import gql from "graphql-tag";

export default {
  actionGetUsers: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query {
          users {
            _id
            name
            gender
            email
            ra
            birthday
            password
            admin
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

      commit(types.GET_USERS, {
        data: value?.users ?? [],
      });
    } catch (erro) {
      console.log("ERRO AO BUSCAR OS USUARIOS");
      console.log(erro);
    }
  },
  actionDeleteUser: async ({ commit, state }, { apollo, id }) => {
    const GQL = gql`
      mutation DeleteUser($deleteUserId: ID) {
        deleteUser(id: $deleteUserId)
      }
    `;

    let value = await apollo
      .mutate({
        mutation: GQL,
        context: {},
        variables: {
          deleteUserId: id,
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
      commit(types.REMOVE_USER, {
        id: id,
      });
      return true;
    }
  },
  actionAddUser: async ({ commit, state }, { apollo, user }) => {
    const GQL = gql`
      mutation CreateUser($data: UserInput) {
        createUser(data: $data) {
          name
          gender
          email
          ra
          birthday
          password
          admin
          _id
        }
      }
    `;

    console.log(user);

    let value = await apollo
      .mutate({
        mutation: GQL,
        context: {},
        variables: {
          data: user,
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
      commit(types.ADD_USER, {
        data: value.createUser,
      });
      return true;
    }
  },
  actionEditUser: async ({ commit, state }, { apollo, user, id }) => {
    const GQL = gql`
      mutation UpdateUser($updateUserId: ID, $data: UserInput) {
        updateUser(id: $updateUserId, data: $data) {
          email
          gender
          ra
          birthday
          password
          admin
          name
        }
      }
    `;

    let value = await apollo
      .mutate({
        mutation: GQL,
        context: {},
        variables: {
          data: user,
          updateUserId: id,
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
      let userData = {
        _id: id,
        ...value.updateUser,
      };
      commit(types.EDIT_USER, {
        data: userData,
      });
      return true;
    }
  },
  actionFilterUser: async ({ commit, state }, { filterUserName }) => {
    console.log(filterUserName);

    let data = state.users.filter((element) =>
      element.name.toUpperCase().includes(filterUserName.toUpperCase())
    );

    commit(types.FILTER_USERS, {
      data: data,
    });
  },
  actionGetSettings: async ({ commit }, { apollo }) => {
    try {
      const query = gql`
        query Query($settingId: ID!) {
          setting(id: $settingId) {
            _id
            logo
            school_name
            default_rent_time_in_days
            maximum_rent_time_in_days
          }
        }
      `;

      let value = await apollo
        .query({
          query: query,
          fetchPolicy: "network-only",
          variables: {
            settingId: "61acfa3f1fdcb47685d1b69a",
          }, // skip the cache
          context: {},
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });

      return value.setting;
    } catch (erro) {
      console.log("ERRO AO BUSCAR AS CONFIFURAÇÕES");
      console.log(erro);
    }
  },
  actionEditSettings: async ({ commit, state }, { apollo, setting, id }) => {

    console.log("direto na action ", setting);

    const GQL = gql`
      mutation Mutation($updateSettingId: ID, $data: SettingInput) {
        updateSetting(id: $updateSettingId, data: $data) {
          _id
          logo
          school_name
          default_rent_time_in_days
          maximum_rent_time_in_days
        }
      }
    `;

    let value = await apollo
      .mutate({
        mutation: GQL,
        context: {},
        variables: {
          data: setting,
          updateSettingId: id,
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
  },
};
