<template>
  <q-dialog>
    <q-card rounded class="q-dialog container-dialog" style="min-width: 50%">
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
          <q-step
            :name="1"
            title="Selecionar o aluno"
            icon="user"
            :done="step > 1"
          >
            <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
              <div class="col-sm-6">
                <q-input
                  filled
                  v-model="ra"
                  type="search"
                  hint="Adicione o RA completo para preencher as informações restantes"
                  label="RA do estudante"
                />
              </div>
              <div class="col-sm-6">
                <q-input
                  filled
                  type="search"
                  label="Nome"
                  readonly
                  v-model="nameUser"
                />
              </div>
            </div>

            <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
              <div class="col-sm-4">
                <q-input filled label="E-mail" readonly v-model="emailUser" />
              </div>
              <div class="col-sm-4">
                <q-input
                  filled
                  label="Data de nascimento"
                  readonly
                  v-model="dateBirth"
                />
              </div>
            </div>
          </q-step>

          <q-step
            :name="2"
            title="Selecionar o livro"
            caption="Optional"
            icon="las la-book"
            :done="step > 2"
          >
            <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
              <div class="col-sm-12">
                <q-input
                  filled
                  label="Buscar o livro"
                  @update:model-value="onSearchBook()"
                  v-model="searchBook"
                />
              </div>
            </div>

            <div
              class="row fit justify-start q-mt-md"
              v-if="searchBook.length > 3"
            >
              <CardBook
                v-for="b in getterBooksFilter"
                :key="b._id"
                :book="b"
                :selectionBook="() => selectionBook(b._id)"
                :idSelectionCard="idBook"
              />
            </div>
          </q-step>

          <q-step
            :name="3"
            title="Selecionar a Vigên"
            caption="Optional"
            icon="las la-calendar"
            :done="step > 3"
          >
            <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
              <div class="col-sm-12">
                <q-input
                  filled
                  label="Data inicial"
                  readonly
                  v-model="dateInitial"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>

              <div
                class="
                  text_size_md
                  fit
                  row
                  justify-center
                  items-center
                  q-mt-sm q-mb-sm
                "
              >
                Há
              </div>

              <div class="col-sm-12">
                <q-input
                  filled
                  label="Data final"
                  mask="##/##/####"
                  v-model="dateFinal"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-input>
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="step == 3 ? addRent() : $refs.stepper.next()"
                unelevated
                color="primary"
                :label="step === 3 ? 'Finalizar' : 'Continuar'"
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
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="Cancelar"
          flat
          v-close-popup
          class="radius"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import CardBook from "../rent/CardBook.vue";
import { useQuasar, QSpinnerTail } from "quasar";
import { createNamespacedHelpers } from "vuex";
import moment from "moment";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("module");
const moduleBook = createNamespacedHelpers("book");
const moduleRent = createNamespacedHelpers("rents");

export default {
  props: {
    title: String,
    user: Object,
    titleButtonConfirm: String,
    onMethod: Function,
  },
  components: {
    CardBook,
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
      step: 1,
      ra: "",
      nameUser: "",
      emailUser: "",
      dateBirth: "",
      searchBook: "",
      idBook: "",
      dateInitial: moment(new Date()).format("DD/MM/YYYY"),
      dateFinal: "",
      idUser: "",
    };
  },
  watch: {
    ra: function (newValue, oldQuestion) {
      if (newValue.length == 13) {
        let user =
          this.getterUsersFilterRent?.find((item) => item.ra == newValue) ??
          false;

        if (user) {
          this.idUser = user._id;
          this.nameUser = user.name;
          this.emailUser = user.email;
          this.dateBirth = moment(user.birthday).format("DD/MM/YYYY");
        } else {
          this.nameUser = "";
          this.emailUser = "";
          this.dateBirth = "";
        }
      }
    },
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
  async mounted() {
    await this.actionGetUsers({ apollo: this.$apollo });
    await this.actionGetBooks({ apollo: this.$apollo });
    let settings = await this.actionGetSettings({ apollo: this.$apollo });
    this.dateFinal = moment(new Date())
      .add(settings.default_rent_time_in_days, "days")
      .format("DD/MM/YYYY");
  },
  computed: {
    ...mapGetters(["getterUsersFilterRent"]),
    ...moduleBook.mapGetters(["getterBooksFilter"]),
  },
  methods: {
    ...mapActions(["actionGetUsers", "actionGetSettings"]),
    ...moduleBook.mapActions(["actionGetBooks", "actionFilterByNameBook"]),
    ...moduleRent.mapActions(["actionAddRent"]),
    onSearchBook() {
      this.actionFilterByNameBook({ name: this.searchBook.toUpperCase() });
    },
    selectionBook(id) {
      this.idBook = id;
    },
    formatDataPqOMomentNaoFoiEEuToComPrequicaDePesquisar(date){
      return date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2)
    },
    async addRent() {
      this.showLoading();

      let rent = {
        start_date: this.formatDataPqOMomentNaoFoiEEuToComPrequicaDePesquisar(this.dateInitial),
        preview_end_date: this.formatDataPqOMomentNaoFoiEEuToComPrequicaDePesquisar(this.dateFinal),
        end_date: this.formatDataPqOMomentNaoFoiEEuToComPrequicaDePesquisar(this.dateFinal),
        book: this.idBook,
        user: this.idUser,
      };

      if (await this.actionAddRent({ apollo: this.$apollo, rent})) {
        this.triggerSuccess("Empréstimo realizado com sucesso.");
        this.onMethod();
        this.hideLoading();
        return
      } else {
        this.triggerError("Ocorreu algum erro ao realizar o empréstimo.");
      }

      this.hideLoading();
    },
  },
};
</script>

<style scoped></style>
