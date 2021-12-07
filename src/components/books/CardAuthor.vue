<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="row items-center">
        <img src="~assets/icons/icons8-william-shakespeare-50.png" width="37" />
        <div class="q-ml-md text_bold" style="font-size: 18px">
          {{ author.name }}
        </div>
      </div>
      <q-btn flat round color="primary" icon="las la-ellipsis-v">
        <q-menu auto-close class="options_menu_global">
          <q-list style="min-width: 230px">
            <q-item clickable v-close-popup>
              <q-item-section class="row" @click="() => (openDialogEdit = true)"
                >Editar autor
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (isShowRemoveauthor = true)"
                >Remover autor</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text_mid_bold q-mt-sm">
      <div class="title_author">{{ author.description ?? 'Não há descrição' }}</div>
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowRemoveauthor"
    title="Deletar author"
    describle="Você realmente deseja deletar esse author?"
    :onMethod="() => deleteauthor()"
    titleButtonConfirm="Deletar"
  />

  <AddauthorDialog
    v-model="openDialogEdit"
    :onClose="() => {}"
    :authorProps="author.name"
    :id="author._id"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import AddauthorDialog from "./AddAuthorDialog.vue";
import DialogSimple from "../common/DialogSimple.vue";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  props: {
    author: Object,
  },
  components: {
    AddauthorDialog,
    DialogSimple,
  },
  data() {
    return {
      isShowBalance: true,
      isShowDeleteauthor: false,
      openDialogEdit: false,
      isShowRemoveauthor: false,
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
    ...mapActions(["actionDeleteAuthor"]),
    async deleteauthor() {
      this.showLoading();

      if (
        await this.actionDeleteAuthor({
          apollo: this.$apollo,
          id: this.author._id,
        })
      ) {
        this.triggerPositive("Autor removido com sucesso.")
        this.isShowDeleteauthor = false;
      } else {
          this.triggerError("Ocorreu algum erro ao remover esse autor.");
      }

      this.loadingHide();
    },
  },
};
</script>
<style scoped>
.title_author {
  font-size: 20px;
  font-weight: 300;
}
</style>
