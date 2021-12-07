<template>
  <q-dialog>
    <q-card rounded class="q-dialog container-dialog" style="min-width: 40%">
      <q-card-section class="row justify-between">
        <div
          class="font-title row items-center"
          style="margin-top: 11px; font-size: 19px"
        >
          <q-img
            src="../../assets/icons/icons8-send-comment-50.png"
            alt="Logo Qyon Bank"
            class="icon_menu q-mr-sm"
          />
          {{ title }}
        </div>
      </q-card-section>

      <q-separator class="q-mt-xs q-mb-md" />

      <div class="row q-ml-md items-center q-mt-lg">
        <i class="lar la-star" style="font-size: 22px; color: #555555" />
        <div class="q-ml-sm text_size_md">Nota</div>
      </div>

      <div class="q-ml-md q-mt-sm">
        <q-rating
          v-model="data.score"
          size="30px"
          color="grey"
          :color-selected="ratingColors"
        />
      </div>

      <div class="row q-ml-md items-center q-mt-lg">
        <i class="las la-pen" style="font-size: 22px; color: #555555" />
        <div class="q-ml-sm text_size_md">Descrição</div>
      </div>

      <div class="q-pa-md">
        <q-input v-model="data.text" filled type="textarea" />
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
          :label="isEdit ? 'Atualizar' : 'Adicionar'"
          @click="() => addOrEdit()"
          flat
          v-close-popup
          class="radius"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { useQuasar, QSpinnerTail } from "quasar";
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapGetters, mapState } =
  createNamespacedHelpers("comments");

export default {
  props: {
    title: String,
    idBook: {
      type: String,
      default: false
    },
    comment: {
      type: Object,
      default: false,
    },
  },
  data() {
    return {
      ratingModel: 0,
      isEdit: false,
      ratingColors: [
        "light-green-3",
        "light-green-6",
        "green",
        "green-9",
        "green-10",
      ],
      data: {
        _id: "",
        text: "",
        score: "",
        book: "",
        author: "",
        reviewed: true,
      },
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
        message: msg || "Ocorreu algum erro ao remover.",
      });
    }

    function triggerPositive(msg) {
      $q.notify({
        type: "positive",
        message: msg || "Livro exluido com sucesso.",
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
  mounted() {
    if (this.comment) {
      this.data.score = this.comment.score;
      this.data.text = this.comment.text;
      this.data._id = this.comment._id;
      this.data.book = this.comment.book._id;
      this.isEdit = true;
    }
  },
  methods: {
    ...mapActions(["actionEditComment", "actionAddComment"]),
    async addOrEdit() {
      let comment = {
        text: this.data.text,
        score: this.data.score,
        book: this.isEdit ? this.data.book : this.idBook,
        author: await localStorage.getItem("id"),
        reviewed: false,
      };

      this.showLoading();

      if (this.isEdit) {
        if (
          await this.actionEditComment({
            apollo: this.$apollo,
            id: this.data._id,
            comment,
          })
        ) {
          this.triggerPositive(
            "O seu Comentário foi atualizado com sucesso e enviado para auditoria."
          );
        } else {
          this.triggerError(
            "Ocorreu algum erro ao atualizar o seu Comentário."
          );
        }
      } else {

        console.log("", comment)
        if (
        await this.actionAddComment({
          apollo: this.$apollo,
          comment,
        })
      ) {
        this.triggerPositive(
          "Comentário realizado com sucesso e enviado para auditoria."
        );
      } else {
        this.triggerError("Ocorreu algum erro ao realizar o seu Comentário.");
      }
      }

      this.loadingHide();
    },
  },
};
</script>
