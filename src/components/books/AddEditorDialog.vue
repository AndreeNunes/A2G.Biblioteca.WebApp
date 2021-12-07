<template>
  <q-dialog>
    <q-card rounded class="q-dialog container-dialog" style="width: 700px">
      <q-card-section class="row justify-between">
        <div
          class="font-title row items-center"
          style="margin-top: 11px; font-size: 19px"
        >
          <q-img
            src="../../assets/icons/icons8-add-book-50.png"
            alt="Logo Qyon Bank"
            class="icon_menu q-mr-sm"
          />
          Adicionar Editor
        </div>
      </q-card-section>

      <q-separator class="q-mt-xs q-mb-md" />

      <div class="q-pr-md q-pl-md">
        <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
          <div class="col-sm-12">
            <q-input v-model="editor" filled label="Nome do editor" />
          </div>
          <div class="col-sm-12 q-mt-sm">
            <q-input v-model="describle" filled label="Descrição" hint="Não é obrigatório"/>
          </div>
        </div>
      </div>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Cancelar"
          flat
          v-close-popup
          class="radius"
        />
        <q-btn
          outline
          color="primary"
          label="Adicionar"
          flat
          v-close-popup
          class="radius"
          @click="() => addeditor()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar, QSpinnerTail } from "quasar";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  props: {
    onClose: Function,
    editorProps: String,
    id: String,
  },
  data() {
    return {
      editor: "",
      describle: "",
      isAdd: true,
    };
  },
  mounted() {
    if (this.editorProps != null) {
      this.editor = this.editorProps;
      this.describle = this.describle
      this.isAdd = false;
    }
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
    ...mapActions(["actionAddEditor", "actionEditEditor"]),
    async addeditor() {
      if (this.editor == null || this.editor == "") {
        this.triggerError("Preencha o nome do editor.");
        return;
      }

      this.showLoading();

      let editorRequest = {
        name: this.editor,
        description: this.describle
      };

      if (this.isAdd) {
        if (
          await this.actionAddEditor({
            apollo: this.$apollo,
            editor: editorRequest,
          })
        ) {
          this.triggerSuccess("Editor addiciona com sucesso.");
        } else {
          this.triggerError("Ocorreu algum erro ao adicionar esse Editor.");
        }
      } else {

          console.log("id", this.id)
          if (
          await this.actionEditEditor({
            apollo: this.$apollo,
            editor: editorRequest,
            id: this.id
          })
        ) {
          this.triggerSuccess("Genêro editado com sucesso.");
        } else {
          this.triggerError("Ocorreu algum erro ao editar esse genêro.");
        }
      }

      this.hideLoading();
    },
  },
};
</script>
