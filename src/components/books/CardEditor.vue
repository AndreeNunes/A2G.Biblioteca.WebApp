<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="row items-center">
        <img src="~assets/icons/icons8-love-book-50.png" width="37" />
        <div class="q-ml-md text_bold" style="font-size: 18px">
          {{ editor.name }}
        </div>
      </div>
      <q-btn flat round color="primary" icon="las la-ellipsis-v">
        <q-menu auto-close class="options_menu_global">
          <q-list style="min-width: 230px">
            <q-item clickable v-close-popup>
              <q-item-section class="row" @click="() => (openDialogEdit = true)"
                >Editar editor
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                class="row"
                @click="() => (isShowRemoveEditor = true)"
                >Remover editor</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text_mid_bold q-mt-sm">
      <div class="title_Editor">{{ editor.description ?? 'Não há descrição' }}</div>
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowRemoveEditor"
    title="Deletar editor"
    describle="Você realmente deseja deletar esse editor?"
    :onMethod="() => deleteEditor()"
    titleButtonConfirm="Deletar"
  />

  <AddEditorDialog
    v-model="openDialogEdit"
    :onClose="() => {}"
    :editorProps="editor.name"
    :id="editor._id"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import AddEditorDialog from "../../components/books/AddEditorDialog.vue";
import DialogSimple from "../common/DialogSimple.vue";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  props: {
    editor: Object,
  },
  components: {
    AddEditorDialog,
    DialogSimple,
  },
  data() {
    return {
      isShowBalance: true,
      isShowDeleteEditor: false,
      openDialogEdit: false,
      isShowRemoveEditor: false,
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
    ...mapActions(["actionDeleteEditor"]),
    async deleteEditor() {
      this.showLoading();

      if (
        await this.actionDeleteEditor({
          apollo: this.$apollo,
          id: this.editor._id,
        })
      ) {
        this.triggerPositive("editor removido com sucesso.")
        this.isShowDeleteEditor = false;
      } else {
          this.triggerError("Ocorreu algum erro ao remover esse editor.");
      }

      this.loadingHide();
    },
  },
};
</script>
<style scoped>
.title_Editor {
  font-size: 20px;
  font-weight: 300;
}
</style>
