<template>
  <q-dialog>
    <q-card
      rounded
      class="q-dialog container-dialog"
      style="min-width: 50%; min-height: 70%"
    >
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

      <div class="q-pa-md">
        <q-stepper
          flat
          v-model="step"
          ref="stepper"
          class="bg-grey-2"
          active-color="primary"
          done-color="positive"
          animated
        >
          <q-step :name="1" prefix="1" title="Genêro, Editor, e Autor">
            <div class="row fit justify-start q-col-gutter-sm">
              <div class="col-sm-12 fit">
                <q-select
                  outlined
                  v-model="gender"
                  :options="getterGender"
                  option-label="name"
                  filled
                  label="Selecione o genêro"
                >
                  <template v-slot:after>
                    <q-btn
                      round
                      dense
                      flat
                      icon="add"
                      @click="() => (openAddGender = true)"
                    />
                  </template>
                </q-select>
              </div>

              <div class="col-sm-12 q-mt-sm fit">
                <q-select
                  outlined
                  v-model="editor"
                  :options="getterEditor"
                  option-label="name"
                  filled
                  label="Selecione o editor"
                >
                  <template v-slot:after>
                    <q-btn
                      round
                      dense
                      flat
                      icon="add"
                      @click="() => (openAddEditor = true)"
                    />
                  </template>
                </q-select>
              </div>

              <div class="col-sm-12 q-mt-sm fit">
                <q-select
                  outlined
                  v-model="author"
                  :options="getterAuthor"
                  option-label="name"
                  filled
                  label="Selecione o autor"
                >
                  <template v-slot:after>
                    <q-btn
                      round
                      dense
                      flat
                      icon="add"
                      @click="() => (openAddAuthor = true)"
                    />
                  </template>
                </q-select>
              </div>
            </div>
          </q-step>

          <q-step :name="2" prefix="2" title="Informações gerais">
            <div class="row fit justify-start q-col-gutter-sm">
              <div class="col-sm-12 q-mt-sm">
                <q-input filled label="Nome do livro" v-model="name" />
              </div>
            </div>

            <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
              <div class="col-sm-6">
                <q-input filled label="Codigo" v-model="code" />
              </div>
              <div class="col-sm-6">
                <q-input
                  filled
                  label="Ano de laçamento"
                  v-model="launch_year"
                />
              </div>
            </div>

            <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
              <div class="col-sm-6">
                <q-input filled label="Versão" v-model="version" />
              </div>
              <div class="col-sm-6">
                <q-input filled label="Disponiveis" v-model="stock" />
              </div>
            </div>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                outline
                @click="step === 1 ? $refs.stepper.next() : addOrEdit()"
                color="secondary"
                :label="step === 2 ? 'Finalizar' : 'Continuar'"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="negative"
                @click="$refs.stepper.previous()"
                label="Voltar"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </q-card>

    <AddAuthorDialog
      v-model="openAddAuthor"
      :onClose="() => {}"
      title="Adicionar autores"
    />

    <AddGenderDialog v-model="openAddGender" :onClose="() => {}" />

    <AddEditorDialog v-model="openAddEditor" :onClose="() => {}" />
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import { createNamespacedHelpers } from "vuex";
import AddEditorDialog from "../../components/books/AddEditorDialog.vue";
import AddAuthorDialog from "../../components/books/AddAuthorDialog.vue";
import AddGenderDialog from "../../components/books/AddGenderDialog.vue";
import { useQuasar, QSpinnerTail } from "quasar";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("book");

export default {
  props: {
    title: String,
    user: Object,
    titleButtonConfirm: String,
    onMethod: Function,
  },
  components: {
    AddEditorDialog,
    AddAuthorDialog,
    AddGenderDialog,
  },
  data() {
    return {
      gender: "",
      editor: "",
      author: "",
      openAddGender: false,
      openAddEditor: false,
      openAddAuthor: false,
      name: "",
      code: "",
      launch_year: "",
      version: "",
      stock: "",
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
      step: ref(1),
    };
  },
  mounted() {
    console.log("teszxsts", this.getterGender);
  },
  computed: {
    ...mapGetters(["getterGender", "getterEditor", "getterAuthor"]),
  },
  methods: {
    ...mapActions(["actionAddBook"]),
    async addOrEdit() {
      if (this.validateFields()) {
        console.log("dgciudasgiu")
        let bookRequest = {
          code: this.code,
          name: this.name,
          gender: this.gender._id,
          editor: this.editor._id,
          author: this.author._id,
          launch_year: parseInt(this.launch_year),
          version: this.version,
          stock: parseInt(this.stock),
        };

        this.showLoading();

        if(await this.actionAddBook({apollo: this.$apollo, book: bookRequest})){
          this.triggerSuccess("Livro adicionado com sucesso.");
          this.onMethod();
        } else {
          this.triggerError("Ocorreu algum erro ao adicionar esse livro.")
        }

        this.hideLoading();
      }
    },
    validateFields() {
      if (this.gender == null || this.gender == "") {
        this.triggerError("Preencha o genêro.");
        return false;
      }

      if (this.editor == null || this.editor == "") {
        this.triggerError("Preencha o editor.");
        return false;
      }

      if (this.author == null || this.author == "") {
        this.triggerError("Preencha o autor.");
        return false;
      }

      if (this.name == null || this.name == "") {
        this.triggerError("Preencha o nome.");
        return false;
      }

      if (this.code == null || this.code == "") {
        this.triggerError("Preencha o codígo.");
        return false;
      }

      if (this.version == null || this.version == "") {
        this.triggerError("Preencha a versão do livro.");
        return false;
      }

      if (this.launch_year == null || this.launch_year == "") {
        this.triggerError("Preencha o ano de laçamento do livro.");
        return false;
      }

      if (this.stock == null || this.stock == "") {
        this.triggerError("Preencha a quantidade de livros disponíveis.");
        return false;
      }

      return true;
    },
  },
};
</script>
