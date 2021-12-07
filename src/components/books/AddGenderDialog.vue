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
          Adicionar Genêro
        </div>
      </q-card-section>

      <q-separator class="q-mt-xs q-mb-md" />

      <div class="q-pr-md q-pl-md">
        <div class="row fit justify-start q-col-gutter-sm q-mt-sm">
          <div class="col-sm-12">
            <q-input v-model="gender" filled label="Nome do genêro" />
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
          @click="() => addGender()"
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
    genderProps: String,
    id: String,
  },
  data() {
    return {
      gender: "",
      isAdd: true,
    };
  },
  mounted() {
    if (this.genderProps != null) {
      this.gender = this.genderProps;
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
    ...mapActions(["actionAddGender", "actionEditGender"]),
    async addGender() {
      if (this.gender == null || this.gender == "") {
        this.triggerError("Preencha o nome do genêro.");
        return;
      }

      this.showLoading();

      let genderRequest = {
        name: this.gender,
      };

      if (this.isAdd) {
        if (
          await this.actionAddGender({
            apollo: this.$apollo,
            gender: genderRequest,
          })
        ) {
          this.triggerSuccess("Genêro addiciona com sucesso.");
        } else {
          this.triggerError("Ocorreu algum erro ao adicionar esse genêro.");
        }
      } else {
          if (
          await this.actionEditGender({
            apollo: this.$apollo,
            gender: genderRequest,
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
