<template>
  <q-card class="container_card_global" style="max-width: 550px">
    <div class="row justify-between items-center">
      <div class="text_bold" style="font-size: 18px">{{ rent.user.name }}</div>
      <i class="las la-user" style="font-size: 30px" />
    </div>

    <div class="row justify-between items-center q-mt-md">
      <div class="text_light text_size_lg" style="font-size: 18px">
        {{ rent.book.name }}
      </div>
      <i class="las la-book" style="font-size: 30px" />
    </div>

    <div class="text_light text_size_md">
      {{ rent.book.gender.name }}
    </div>

    <div class="text_bold text_size_md q-mt-md">Informações</div>

    <div class="text_light text_size_md q-mt-md row justify-between">
      <div>
        <i class="las la-angle-right"></i>
        Data inicial:
      </div>
      <div>{{ formatDate(rent.start_date) }}</div>
    </div>

    <div class="text_light text_size_md q-mt-sm row justify-between">
      <div>
        <i class="las la-angle-right"></i>
        Data final:
      </div>
      <div>{{ formatDate(rent.preview_end_date) }}</div>
    </div>

    <div class="text_light text_size_md q-mt-sm row justify-between">
      <div>
        <i class="las la-angle-right"></i>
        Data máxima de entrega:
      </div>
      <div>{{ rent.end_date != null ? formatDate(rent.end_date) : "Não há data máxima parametrizada"}}</div>
    </div>

    <div class="row justify-end q-mt-lg">
         <q-btn class="q-mt-md" outline color="primary" label="Devolver" @click="() => isShowDeleteRent = true"/>
    </div>
  </q-card>

  <DialogSimple
    v-model="isShowDeleteRent"
    title="Devolução de livro"
    describle="Você realmente deseja realizar essa devolução?"
    :onMethod="() => deleteRent()"
    titleButtonConfirm="Devolver"
  />
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { useQuasar, QSpinnerTail } from "quasar";
import DialogSimple from "../../components/common/DialogSimple.vue";
import DialogAddOrEditOrInformation from "../users/DialogAddOrEdit.vue";
import { formatDate } from "../../helper/Formatter";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers("rents");

export default {
  props: {
    rent: Object,
  },
  components: {
    DialogSimple,
    DialogAddOrEditOrInformation,
  },
  data() {
    return {
      isShowDeleteRent: false,
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
      ...mapActions(['actionDeleteRent']),
      formatDate(data){
          return formatDate(data);
      },
      async deleteRent(){ 
          this.showLoading()

          if(await this.actionDeleteRent({ apollo: this.$apollo, id: this.rent._id })){
            this.triggerPositive("Livro devolvido com sucesso.")
          } else {
            this.triggerError("Ocorreu algum erro ao realizar a devolução do livro.")
          }

          this.loadingHide()
      }
  }
};
</script>
<style></style>
