<template>
  <q-page class="flex">
    <div class="row container">
      <img src="~assets/logo_branco.png" width="250" />
    </div>

    <div class="containerLogin q-mt-lg">
      <div class="subContainerLogin">
        <div class="subContainerLoginTitle">
          <p class="text_bold q-mt-lg q-mb-xs" style="font-size: 22px">
            Bem-vindo
          </p>
          <p class="font q-mb-xs" style="font-size: 17px">
            Sua biblioteca online
          </p>
        </div>
        <div style="width: 85%">
          <q-form @submit.prevent.stop="onSubmit">
            <q-input
              outlined
              v-model="ra"
              label="E-mail"
              class="q-mb-md q-mt-xl font-medium"
            >
              <template v-slot:append>
                <q-icon :name="'email'" />
              </template>
            </q-input>
            <q-input
              outlined
              v-model="password"
              label="Senha"
              class="font-medium"
              :type="!isVisiblePassword ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  :name="isVisiblePassword ? 'visibility' : 'visibility_off'"
                  @click="togglePasswordVisibility()"
                />
              </template>
            </q-input>
            <q-btn
              outline
              label="Acessar"
              color="grey"
              class="button font-medium"
              type="submit"
            />

            <div class="row q-mt-md text-grey-8">
              Esqueceu a senha
            </div>
          </q-form>
        </div>

        <div />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reactive } from "@vue/reactivity";
import { useQuasar, QSpinnerTail } from "quasar";
import { onMounted } from "vue";
import gql from "graphql-tag";

export default {
  name: "login",
  components: {},
  data() {
    return {
      password: "",
      ra: "",
      isVisiblePassword: false,
    };
  },
  setup() {
    const $q = useQuasar();

    function togglePasswordVisibility() {
      state.isVisiblePassword = !state.isVisiblePassword;
    }

    function showLoading() {
      $q.loading.show({
        spinner: QSpinnerTail,
        spinnerSize: 80,
        backgroundColor: "#ddd",
        messageColor: "black",
      });
    }

    function triggerError(msg) {
      $q.notify({
        type: "negative",
        message: msg || "Ocorreu algum erro, ao realizar esse processo.",
      });
    }

    function hideLoading() {
      $q.loading.hide();
    }

    return {
      togglePasswordVisibility,
      showLoading,
      triggerError,
      hideLoading,
    };
  },
  mounted() {
    let login = localStorage.getItem("login");

    if (login != "null" && login != null && login != "") {
      window.location.href = "#/home";
    }
  },
  methods: {
    async onSubmit() {
      if (this.password == "" || this.ra == "") {
        this.triggerError("Verifique os campos e tente novamente.");
        return;
      }

      this.showLoading();

      const query = gql`
        query {
          userLogin(ra: "${this.ra}", password: "${this.password}") {
            ... on User {
              _id
              name
              email
              gender
              ra
              birthday
              password
              admin
            }
          }
        }
      `;

      let value = await this.$apollo
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


      if (value == null) {
        this.triggerError(
          "Ocorreu algum erro ao efetuar o seu acesso, por favor tente novamente mais tarde."
        );
        this.hideLoading();
        return;
      } else {
        if (value.userLogin.message) {
          this.triggerError("Acesso não encontrado.");
          this.hideLoading();
          return;
        } else {
          localStorage.setItem("login", value.userLogin.ra);
          localStorage.setItem("admin", value.userLogin.admin);
          localStorage.setItem("email", value.userLogin.email);
          localStorage.setItem("name", value.userLogin.name);
          localStorage.setItem("id", value.userLogin._id);
          this.hideLoading();
          window.location.href = "#/home";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 290px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: $primary;
  display: flex;
  justify-content: center;
  align-items: center;
}

.containerImg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $primary;
  border-bottom-left-radius: 35px;
  border-top-left-radius: 35px;
}

.containerLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 200px;
  width: 100%;
  //z-index: 9999;
  top: 320px;
}

.subContainerLogin {
  height: 400px;
  width: 550px;
  margin: 15px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 4px 4px 50px 4px rgba(100, 100, 100, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teste {
  background-color: aqua;
}

.img {
  background-color: aquamarine;
  width: auto;
}

.subContainerLoginTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  margin-top: 20px;
  width: 100%;
  height: 45px;
}

.radius {
  border-radius: 20px;
}
</style>
