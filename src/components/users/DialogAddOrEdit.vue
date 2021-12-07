<template>
  <q-dialog>
    <q-card rounded class="q-dialog container-dialog" style="width: 700px">
      <q-card-section class="row justify-between">
        <div
          class="font-title row items-center"
          style="margin-top: 11px; font-size: 19px"
        >
          <q-img
            src="../../assets/icons/icons8-user-50.png"
            alt="Logo Qyon Bank"
            class="icon_menu q-mr-sm"
          />
          {{ title }}
        </div>
      </q-card-section>

      <q-separator class="q-mt-xs q-mb-md" />

      <div class="q-pr-md q-pl-md">
        <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
          <div class="col-sm-12">
            <q-input
              v-model="name"
              filled
              label="Nome"
              :readonly="isInformation"
            />
          </div>
          <div class="col-sm-12 q-mt-sm">
            <q-input
              v-model="email"
              filled
              label="E-mail"
              :readonly="isInformation"
            />
          </div>
        </div>

        <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
          <div class="col-sm-6" v-if="isAddUser">
            <q-input
              filled
              v-model="password"
              label="Senha"
              class="font-medium"
              :readonly="isInformation"
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
          </div>
          <div :class="!isAddUser ? 'col-sm-12' : 'col-sm-6'">
            <q-input
              v-model="birthday"
              filled
              mask="##/##/####"
              label="Data de nascimento"
              :readonly="isInformation"
            />
          </div>
        </div>

        <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
          <div class="col-sm-6">
            <q-select
              outlined
              v-model="gender"
              :options="genders"
              filled
              :readonly="isInformation"
              label="Selecione o gênero"
            />
          </div>
          <div class="col-sm-6">
            <q-input v-model="ra" filled label="RA" :readonly="isInformation" />
          </div>
        </div>

        <div class="row fit justify-start q-col-gutter-sm q-mt-sm q-mb-md">
          <div class="col-sm-12">
            <q-select
              outlined
              v-model="typeAccount"
              :options="typeAccounts"
              filled
              :readonly="isInformation"
              label="Selecione o nível de usuario"
            />
          </div>
        </div>
      </div>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          :label="isInformation ? 'Ok' : 'Cancelar'"
          flat
          v-close-popup
          class="radius"
        />
        <q-btn
          outline
          v-if="!isInformation"
          color="primary"
          :label="titleButtonConfirm ?? 'Ok'"
          flat
          class="radius"
          @click="addOrEdit()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, QSpinnerTail } from "quasar";
import { createNamespacedHelpers } from "vuex";
import momemt from 'moment';
import { formatDateTwo } from '../../helper/Formatter';

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("module");

export default {
  props: {
    title: String,
    user: {
      type: Object,
      default: {},
    },
    titleButtonConfirm: String,
    onMethod: Function,
    isInformation: Boolean,
  },
  data() {
    return {
      gender: "",
      genders: ["M", "F"],
      typeAccount: "",
      typeAccounts: ["Aluno", "Admistrador"],
      name: "",
      email: "",
      ra: "",
      birthday: "",
      password: "",
      admin: "",
      isVisiblePassword: false,
      id: "",
      isAddUser: false,
    };
  },
  setup() {
    const $q = useQuasar();

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

    function triggerSuccess(msg) {
      $q.notify({
        type: "positive",
        message: msg || "Sucesso em realizar esse processo.",
      });
    }

    function hideLoading() {
      $q.loading.hide();
    }

    return {
      showLoading,
      triggerError,
      hideLoading,
      triggerSuccess,
    };
  },
  methods: {
    ...mapActions(["actionAddUser", "actionEditUser"]),
    togglePasswordVisibility() {
      this.isVisiblePassword = !this.isVisiblePassword;
    },
    async addOrEdit() {
      if (this.validateFields()) {
        let userRequest = {
          name: this.name,
          email: this.email,
          gender: this.gender,
          ra: this.ra,
          birthday: formatDateTwo(this.birthday),
          password: this.password,
          admin: this.typeAccount == "Aluno" ? false : true,
        };

        console.log(userRequest)

        this.showLoading();

        if (this.isAddUser) {
          
          if( await this.actionAddUser({apollo: this.$apollo, user: userRequest})){
            this.triggerSuccess("Usuário adicionar com sucesso.");
            this.onMethod();
          } else {
            this.triggerError("Ocorreu algo erro ao adicionar esse usuário.");
          }

        } else {
          if (
            await this.actionEditUser({
              apollo: this.$apollo,
              user: userRequest,
              id: this.id,
            })
          ) {
            this.triggerSuccess("Usuário editado com sucesso.");
            this.onMethod();
          } else {
            this.triggerError("Ocorreu algo erro ao editar esse usuário.");
          }
        }

        this.hideLoading();
      }
    },
    validateFields() {
      if (this.name == null || this.name == "") {
        this.triggerError("Preencha o nome");
        return false;
      }

      if (this.email == null || this.email == "") {
        this.triggerError("Preencha o email");
        return false;
      }

      if (this.password == null || this.password == "") {
        this.triggerError("Preencha a senha");
        return false;
      }

      if (this.ra == null || this.ra == "") {
        this.triggerError("Preencha o ra");
        return false;
      }

      if (this.birthday == null || this.birthday == "") {
        this.triggerError("Preencha a data de nascimento");
        return false;
      }

      if (this.gender == null || this.gender == "") {
        this.triggerError("Preencha o genêro");
        return false;
      }

      if (this.typeAccount == null || this.typeAccount == "") {
        this.triggerError("Preencha o tipo de conta");
        return false;
      }

      return true;
    },
  },
  mounted() {
    if (this.user.name != null) {
      this.id = this.user._id;
      this.name = this.user.name;
      this.gender = this.user.gender;
      this.email = this.user.email;
      this.ra = this.user.ra;
      this.birthday = momemt(this.user.birthday).format('DD/MM/YYYY');
      this.password = this.user.password;
      this.typeAccount = this.user.admin ? "Admistrador" : "Aluno";
    } else {
      this.isAddUser = true;
    }
  },
};
</script>
