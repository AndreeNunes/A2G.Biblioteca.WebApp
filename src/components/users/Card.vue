<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="text_bold" style="font-size: 18px">{{ user.name }}</div>
      <q-btn flat round color="primary" icon="las la-ellipsis-v">
        <q-menu auto-close class="options_menu_global">
          <q-list style="min-width: 230px">
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (openDialogInformation = true)"
                >Mais informações
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (openDialogEdit = true)"
                >Editar usuários
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (isShowRemoveUser = true)"
                >Remover usuário</q-item-section
              >
            </q-item>

          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text_mid_bold q-mt-sm">
      <p style="margin: 0; padding: 0; font-size: 15px">
        E-MAIL: {{ user.email }}
      </p>
      <div class="text_light row items-center">
        RA: {{ user?.ra ?? "Recarregue a pagina." }}
      </div>
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowRemoveUser"
    title="Remover usuário"
    describle="Você realmente deseja remover esse usuario?"
    :onMethod="() => deleteUser()"
    titleButtonConfirm="Deletar"
  />

  <DialogAddOrEditOrInformation v-model="openDialogEdit" title="Editar usuário" :user="user" titleButtonConfirm="Editar" :onMethod="() => openDialogEdit = false"/>
  <DialogAddOrEditOrInformation v-model="openDialogInformation" title="Informação do usuário" :user="user" titleButtonConfirm="" :onMethod="() => openDialogInformation = false" :isInformation="true"/>

</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import DialogSimple from '../../components/common/DialogSimple.vue';
import DialogAddOrEditOrInformation from '../users/DialogAddOrEdit.vue';

const { mapActions, mapGetters, mapState } =
  createNamespacedHelpers("module");

export default {
  props: {
    user: Object,
  },
  components: {
    DialogSimple,
    DialogAddOrEditOrInformation
  },
  data() {
    return {
      isShowRemoveUser: false,
      openDialogEdit: false,
      openDialogInformation: false,
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
        message: msg || "Ocorreu algum erro ao excluir a chave.",
      });
    }

    function triggerPositive(msg) {
      $q.notify({
        type: "positive",
        message: msg || "Chave exluida com sucesso.",
      });
    }

    function loadingHide() {
      $q.loading.hide();
    }

    return {
      showLoading,
      triggerError,
      triggerPositive,
      loadingHide,
    };
  },
  methods: {
    ...mapActions(["actionDeleteUser"]),
    async deleteUser() {
      this.showLoading();

      if(await this.actionDeleteUser({apollo: this.$apollo, id: this.user._id})){
        this.triggerPositive("Usuário deletado com sucesso.");
      } else {
        this.triggerError("Ocorreu algum erro ao deletar esse usuário.");
      }

      this.loadingHide();

      this.isShowDeleteKey = false;
    },
  },
};
</script>
<style></style>
