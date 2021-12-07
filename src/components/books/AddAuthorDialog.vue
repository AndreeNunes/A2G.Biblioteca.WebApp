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
          {{ title }}
        </div>
      </q-card-section>

      <q-separator class="q-mt-xs q-mb-md" />

      <div class="q-pr-md q-pl-md">
        <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
          <div class="col-sm-12">
            <q-input v-model="author" filled label="Nome do autor" />
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
          @click="() => addauthor()"
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
    authorProps: String,
    id: String,
    title: String
  },
  data() {
    return {
      author: "",
      describle: "",
      isAdd: true,
    };
  },
  mounted() {
    if (this.authorProps != null) {
      this.author = this.authorProps;
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
    ...mapActions(["actionAddAuthor", "actionEditAuthor"]),
    async addauthor() {
      if (this.author == null || this.author == "") {
        this.triggerError("Preencha o nome do author.");
        return;
      }

      this.showLoading();

      let authorRequest = {
        name: this.author,
        description: this.describle
      };

      if (this.isAdd) {
        if (
          await this.actionAddAuthor({
            apollo: this.$apollo,
            author: authorRequest,
          })
        ) {
          this.triggerSuccess("author addiciona com sucesso.");
        } else {
          this.triggerError("Ocorreu algum erro ao adicionar esse author.");
        }
      } else {

          console.log("id", this.id)
          if (
          await this.actionEditAuthor({
            apollo: this.$apollo,
            author: authorRequest,
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
