<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="row items-center">
        <img src="~assets/icons/icons8-law-book-50.png" width="37" />
        <div class="q-ml-md text_bold" style="font-size: 18px">
          {{ gender.name }}
        </div>
      </div>
      <q-btn flat round color="primary" icon="las la-ellipsis-v">
        <q-menu auto-close class="options_menu_global">
          <q-list style="min-width: 230px">
            <q-item clickable v-close-popup>
              <q-item-section class="row" @click="() => (openDialogEdit = true)"
                >Editar genêro
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (isShowRemoveGender = true)"
                >Remover genêro</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text_mid_bold q-mt-sm">
      <div class="title_gender">{{ gender._id }}</div>
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowRemoveGender"
    title="Deletar Genêro"
    describle="Você realmente deseja deletar esse genêro?"
    :onMethod="() => deleteGender()"
    titleButtonConfirm="Deletar"
  />

  <AddGenderDialog
    v-model="openDialogEdit"
    :onClose="() => {}"
    :genderProps="gender.name"
    :id="gender._id"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import AddGenderDialog from "../../components/books/AddGenderDialog.vue";
import DialogSimple from "../common/DialogSimple.vue";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  props: {
    gender: Object,
  },
  components: {
    AddGenderDialog,
    DialogSimple,
  },
  data() {
    return {
      isShowBalance: true,
      isShowDeleteGender: false,
      openDialogEdit: false,
      isShowRemoveGender: false,
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
    ...mapActions(["actionDeleteGender"]),
    async deleteGender() {
      this.showLoading();

      if (
        await this.actionDeleteGender({
          apollo: this.$apollo,
          id: this.gender._id,
        })
      ) {
        this.triggerPositive("Genêro removido com sucesso.")
        this.isShowDeleteGender = false;
      } else {
          this.triggerError("Ocorreu algum erro ao remover esse genêro.");
      }

      this.loadingHide();
    },
  },
};
</script>
<style scoped>
.title_gender {
  font-size: 20px;
  font-weight: 300;
}
</style>
